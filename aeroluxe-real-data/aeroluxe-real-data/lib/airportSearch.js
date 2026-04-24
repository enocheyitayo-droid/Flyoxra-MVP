// lib/airportSearch.js
// ─────────────────────────────────────────────────────────────────────────────
// Fuse.js-powered fuzzy airport search engine.
// Loads airports-mini.json once, caches in memory.
//
// airports-mini.json schema: array of arrays
//   [iata, icao, name, city, country, iso, lat, lon]
//
// To get the full 9 000+ airport dataset:
//   node scripts/build-airport-data.js
// ─────────────────────────────────────────────────────────────────────────────

let _fuse     = null;
let _airports = null;

// Keys and weights for Fuse.js
const FUSE_OPTIONS = {
  includeScore:     true,
  threshold:        0.35,     // 0 = exact match, 1 = match anything
  ignoreLocation:   true,     // don't penalise matches in the middle of a string
  minMatchCharLength: 2,
  keys: [
    { name: 'iata',    weight: 0.45 },  // "LOS" → highest priority
    { name: 'city',    weight: 0.30 },  // "Lagos"
    { name: 'name',    weight: 0.15 },  // "Murtala Muhammed"
    { name: 'country', weight: 0.05 },  // "Nigeria"
    { name: 'icao',    weight: 0.05 },  // "DNMM"
  ],
};

/**
 * Expand mini array format to object
 * [iata, icao, name, city, country, iso, lat, lon] → {}
 */
function expand(row) {
  return {
    iata:    row[0] || '',
    icao:    row[1] || '',
    name:    row[2] || '',
    city:    row[3] || '',
    country: row[4] || '',
    iso:     row[5] || '',
    lat:     row[6] || 0,
    lon:     row[7] || 0,
  };
}

/**
 * Load and initialise Fuse.js index (called once on first search).
 * Works in browser (fetch) and Node (require).
 */
async function init() {
  if (_fuse) return;

  // Dynamic import of Fuse.js (works in both Next.js client and server)
  const Fuse = (await import('fuse.js')).default;

  let rawData;
  try {
    // Browser / Next.js: fetch from public directory
    const res = await fetch('/data/airports-mini.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    rawData = await res.json();
  } catch (e) {
    console.warn('[airportSearch] Could not load airports-mini.json:', e.message);
    rawData = [];
  }

  _airports = rawData.map(expand);
  _fuse     = new Fuse(_airports, FUSE_OPTIONS);
}

/**
 * Search airports by query string.
 * Returns up to `limit` results sorted by relevance.
 *
 * @param {string} query   — e.g. "lag", "LOS", "london", "charles de gaulle"
 * @param {number} limit   — max results (default 10)
 * @returns {Array<Object>}
 */
export async function searchAirports(query, limit = 10) {
  if (!query || query.trim().length < 2) return [];
  await init();
  if (!_fuse) return [];

  const q = query.trim();

  // Exact IATA code match — always surface first
  if (/^[a-zA-Z]{3}$/.test(q)) {
    const upper = q.toUpperCase();
    const exact = _airports.filter(a => a.iata === upper);
    if (exact.length > 0) {
      // Return exact match + fuzzy fill
      const fuzzy = _fuse.search(q, { limit: limit + exact.length })
        .map(r => r.item)
        .filter(a => a.iata !== upper);
      return [...exact, ...fuzzy].slice(0, limit);
    }
  }

  return _fuse.search(q, { limit }).map(r => r.item);
}

/**
 * Get a single airport by IATA code (exact).
 * @param {string} iata
 * @returns {Object|null}
 */
export async function getByIATA(iata) {
  await init();
  return _airports?.find(a => a.iata === iata.toUpperCase()) || null;
}

/**
 * Return total number of airports loaded.
 */
export async function getCount() {
  await init();
  return _airports?.length || 0;
}
