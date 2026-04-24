#!/usr/bin/env node
// scripts/build-airport-data.js
// ─────────────────────────────────────────────────────────────────────────────
// Run ONCE to download the full OurAirports dataset and generate:
//   public/data/airports.json       — full ~9 000 IATA airports
//   public/data/airports-mini.json  — IATA-only, name+city+country (compact)
//
// Usage:
//   node scripts/build-airport-data.js
//
// Requires Node 18+ (built-in fetch).
// Re-run any time you want to refresh the dataset.
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require('fs');
const path = require('path');
const https = require('https');

const SOURCES = [
  // Primary — OurAirports (28 000+ airports, Creative Commons)
  'https://davidmegginson.github.io/ourairports-data/airports.csv',
  // Mirror 1
  'https://raw.githubusercontent.com/mwgg/Airports/master/airports.json',
];

const OUT_DIR  = path.join(__dirname, '..', 'public', 'data');
const OUT_FULL = path.join(OUT_DIR,  'airports.json');
const OUT_MINI = path.join(OUT_DIR,  'airports-mini.json');

// ── Country ISO → full name map (for display) ─────────────────────────────
const COUNTRY_NAMES = {
  NG:'Nigeria', GB:'United Kingdom', US:'United States', AE:'UAE',
  GH:'Ghana', KE:'Kenya', ZA:'South Africa', EG:'Egypt', MA:'Morocco',
  FR:'France', DE:'Germany', IT:'Italy', ES:'Spain', NL:'Netherlands',
  SG:'Singapore', HK:'Hong Kong', AU:'Australia', JP:'Japan', IN:'India',
  BR:'Brazil', CA:'Canada', MX:'Mexico', TR:'Turkey', SA:'Saudi Arabia',
  QA:'Qatar', KW:'Kuwait', BH:'Bahrain', OM:'Oman', TZ:'Tanzania',
  UG:'Uganda', RW:'Rwanda', ET:'Ethiopia', SN:'Senegal', CI:'Ivory Coast',
  CM:'Cameroon', ZW:'Zimbabwe', ZM:'Zambia', MZ:'Mozambique', AO:'Angola',
  // Add more as needed — full list at https://en.wikipedia.org/wiki/ISO_3166-1
};

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AeroLuxe-DataBuilder/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return get(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end',  () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g,'').trim());
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    // Handle quoted fields
    const vals = [];
    let inQ = false, cur = '';
    for (const ch of line) {
      if (ch === '"') { inQ = !inQ; continue; }
      if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    vals.push(cur.trim());
    const row = {};
    headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });
    rows.push(row);
  }
  return rows;
}

async function buildFromCSV(csvText) {
  const rows = parseCSV(csvText);
  const airports = [];
  const SKIP_TYPES = new Set(['heliport','closed','balloonport']);

  for (const r of rows) {
    const type    = (r.type || '').trim();
    if (SKIP_TYPES.has(type)) continue;

    const iata    = (r.iata_code     || '').trim().toUpperCase();
    const icao    = (r.ident         || '').trim().toUpperCase();
    const name    = (r.name          || '').trim();
    const city    = (r.municipality  || '').trim();
    const iso     = (r.iso_country   || '').trim().toUpperCase();
    const region  = (r.iso_region    || '').trim();
    const lat     = parseFloat(r.latitude_deg  || '0') || 0;
    const lon     = parseFloat(r.longitude_deg || '0') || 0;
    const elev    = parseInt(r.elevation_ft    || '0') || 0;

    if (!name) continue;
    if (!iata && !icao) continue;

    const country = COUNTRY_NAMES[iso] || iso;

    const entry = {
      iata,
      icao,
      name,
      city,
      country,
      iso,
      type,    // large_airport | medium_airport | small_airport | seaplane_base
      lat:  Math.round(lat  * 10000) / 10000,
      lon:  Math.round(lon  * 10000) / 10000,
      elev,
    };

    // Priority sort key: IATA airports first, then large, then medium, then small
    entry._rank = iata ? 0 : type === 'large_airport' ? 1 : type === 'medium_airport' ? 2 : 3;
    airports.push(entry);
  }

  // Sort: IATA-first then large → small
  airports.sort((a, b) => a._rank - b._rank || a.country.localeCompare(b.country));
  airports.forEach(a => delete a._rank);

  return airports;
}

async function buildFromJSON(jsonText) {
  // mwgg/Airports format: { "ICAO": { iata, name, city, country, lat, lon, ... } }
  const raw = JSON.parse(jsonText);
  const airports = Object.values(raw).map(a => ({
    iata:    (a.iata    || '').toUpperCase(),
    icao:    (a.icao    || a.ICAO || '').toUpperCase(),
    name:    a.name    || '',
    city:    a.city    || '',
    country: a.country || a.iso || '',
    iso:     a.iso     || '',
    type:    a.type    || 'airport',
    lat:     parseFloat(a.lat || a.latitude  || 0) || 0,
    lon:     parseFloat(a.lon || a.longitude || 0) || 0,
    elev:    parseInt(a.elevation || 0) || 0,
  })).filter(a => a.name && (a.iata || a.icao));
  return airports;
}

(async () => {
  console.log('▶ AeroLuxe Airport Data Builder');
  console.log('================================\n');
  fs.mkdirSync(OUT_DIR, { recursive: true });

  let airports = null;

  for (const src of SOURCES) {
    try {
      console.log(`Trying: ${src}`);
      const text = await get(src);
      console.log(`  Downloaded ${(text.length / 1024).toFixed(0)} KB`);

      if (src.endsWith('.json')) {
        airports = await buildFromJSON(text);
      } else {
        airports = await buildFromCSV(text);
      }
      console.log(`  Parsed ${airports.length.toLocaleString()} airports`);
      break;
    } catch (err) {
      console.warn(`  Failed: ${err.message}`);
    }
  }

  if (!airports || airports.length === 0) {
    console.error('\n✗ All sources failed. The static fallback in AirportSearch.jsx will be used instead.');
    console.error('  Check your internet connection or try running again later.');
    process.exit(1);
  }

  const iataCount = airports.filter(a => a.iata).length;
  console.log(`\n  Total : ${airports.length.toLocaleString()}`);
  console.log(`  IATA  : ${iataCount.toLocaleString()}`);
  console.log(`  ICAO  : ${(airports.length - iataCount).toLocaleString()}`);

  // ── Write full JSON ──────────────────────────────────────────────────────
  fs.writeFileSync(OUT_FULL, JSON.stringify(airports));
  const fullKB = Math.round(fs.statSync(OUT_FULL).size / 1024);
  console.log(`\n✓ airports.json       → ${fullKB} KB  (${OUT_FULL})`);

  // ── Write mini JSON (IATA only, minimal fields) for browser bundle ───────
  const mini = airports
    .filter(a => a.iata)
    .map(a => [a.iata, a.icao, a.name, a.city, a.country, a.iso, a.lat, a.lon]);
  fs.writeFileSync(OUT_MINI, JSON.stringify(mini));
  const miniKB = Math.round(fs.statSync(OUT_MINI).size / 1024);
  console.log(`✓ airports-mini.json  → ${miniKB} KB  (${OUT_MINI})`);

  console.log('\n✅ Done! Rebuild any time with: node scripts/build-airport-data.js');
})();
