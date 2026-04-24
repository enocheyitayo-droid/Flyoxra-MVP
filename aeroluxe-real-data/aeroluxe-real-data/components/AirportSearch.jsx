// components/AirportSearch.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Real IATA Airport Search with Fuse.js fuzzy matching.
//
// HOW TO GET ALL 9 000+ AIRPORTS:
//   1. Run:   node scripts/build-airport-data.js
//   2. This generates  public/data/airports-mini.json  (from OurAirports)
//   3. Commit  public/data/airports-mini.json  (or add to .gitignore & CDN)
//
// The 296-airport seed ships with the project so it works out-of-the-box.
// After running the build script you get every airport on earth including
// private airstrips, island runways, and remote bush strips.
//
// USAGE in BookingForm.jsx:
//   import AirportSearch from './AirportSearch';
//   <AirportSearch
//     label="Departure Airport / City"
//     placeholder="Lagos, LOS, London Heathrow…"
//     value={form.fromObj}
//     onChange={(v) => setForm(f => ({ ...f, fromObj: v }))}
//     error={!!errors.from}
//   />
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from 'react';
import { searchAirports } from '../lib/airportSearch';

const DEBOUNCE_MS = 220;

/** Small type badge */
function TypeBadge({ type }) {
  const map = {
    large_airport:  { label: 'International', color: '#c9a84c', bg: 'rgba(201,168,76,0.12)' },
    medium_airport: { label: 'Regional',       color: '#6fa3d4', bg: 'rgba(111,163,212,0.12)' },
    small_airport:  { label: 'Private / GA',   color: '#5ab87a', bg: 'rgba(90,184,122,0.12)' },
    seaplane_base:  { label: 'Seaplane',        color: '#9b87d9', bg: 'rgba(155,135,217,0.12)' },
  };
  const s = map[type] || { label: 'Airport', color: 'var(--dim)', bg: 'var(--ghost)' };
  return (
    <span style={{
      fontSize: 10, padding: '1px 7px', borderRadius: 20,
      background: s.bg, color: s.color, fontWeight: 500, letterSpacing: '0.03em',
      flexShrink: 0,
    }}>
      {s.label}
    </span>
  );
}

export default function AirportSearch({
  label,
  placeholder = 'City, airport name or IATA code…',
  value,
  onChange,
  error = false,
  id,
}) {
  const [query,    setQuery]    = useState(value?.label || '');
  const [results,  setResults]  = useState([]);
  const [open,     setOpen]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [active,   setActive]   = useState(-1);
  const timerRef   = useRef(null);
  const wrapRef    = useRef(null);
  const inputRef   = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync if value is set externally
  useEffect(() => {
    if (value?.label && value.label !== query) setQuery(value.label);
  }, [value]);

  const search = useCallback(async (q) => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await searchAirports(q, 10);
      setResults(res);
      setOpen(res.length > 0);
    } catch (e) {
      console.error('[AirportSearch]', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    setActive(-1);
    clearTimeout(timerRef.current);
    // Show immediately if IATA code length
    if (/^[a-zA-Z]{3}$/.test(q.trim())) {
      search(q);
    } else {
      timerRef.current = setTimeout(() => search(q), DEBOUNCE_MS);
    }
  };

  const select = (airport) => {
    const label = `${airport.city} (${airport.iata || airport.icao})`;
    setQuery(label);
    setOpen(false);
    setActive(-1);
    onChange({
      label,
      iata:    airport.iata,
      icao:    airport.icao,
      name:    airport.name,
      city:    airport.city,
      country: airport.country,
      iso:     airport.iso,
      lat:     airport.lat,
      lon:     airport.lon,
    });
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && active >= 0) { e.preventDefault(); select(results[active]); }
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
    onChange(null);
    inputRef.current?.focus();
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }} id={id}>
      <div className="field">
        {label && <label>{label}</label>}

        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0) setOpen(true); }}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={false}
            style={{
              borderColor: error ? 'var(--err)' : undefined,
              paddingRight: query ? 64 : 36,
            }}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
              style={{
                position: 'absolute', right: 34, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--dim)',
                fontSize: 14, cursor: 'pointer', padding: '2px 4px', lineHeight: 1,
              }}
              tabIndex={-1}
            >
              ✕
            </button>
          )}

          {/* Status icon */}
          <span style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, pointerEvents: 'none',
            color: loading ? 'var(--gold)' : error ? 'var(--err)' : 'var(--dim)',
          }}>
            {loading ? '⟳' : '✈'}
          </span>
        </div>
      </div>

      {/* ── Dropdown ── */}
      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg3)', border: '1px solid var(--bdr)',
          borderRadius: 10, zIndex: 600, overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
          maxHeight: 380, overflowY: 'auto',
        }}>
          {results.map((a, i) => (
            <div
              key={`${a.iata || a.icao}-${i}`}
              onMouseDown={(e) => { e.preventDefault(); select(a); }}
              onMouseEnter={() => setActive(i)}
              style={{
                padding: '10px 14px', cursor: 'pointer',
                background: i === active ? 'var(--gold-bg)' : 'transparent',
                borderBottom: i < results.length - 1 ? '1px solid var(--bdr)' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'background 0.12s',
              }}
            >
              {/* IATA / ICAO badge */}
              <div style={{
                minWidth: 46, textAlign: 'center',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: a.iata ? 16 : 13,
                fontWeight: 500, color: 'var(--gold)',
                background: 'var(--gold-bg)', border: '1px solid var(--gold-bdr)',
                borderRadius: 6, padding: '2px 6px', flexShrink: 0,
                letterSpacing: '0.05em',
              }}>
                {a.iata || a.icao}
              </div>

              {/* Info */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 500, color: i === active ? 'var(--cream)' : 'var(--text)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    maxWidth: 200,
                  }}>
                    {a.city || a.name}
                  </span>
                  <TypeBadge type={a.type} />
                </div>
                <div style={{
                  fontSize: 12, color: 'var(--muted)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {a.name}{a.country ? ` · ${a.country}` : ''}
                </div>
              </div>

              {/* Country flag via ISO (emoji trick) */}
              {a.iso && (
                <span style={{ fontSize: 18, flexShrink: 0 }}>
                  {a.iso.toUpperCase().replace(/./g, c =>
                    String.fromCodePoint(c.charCodeAt(0) + 127397)
                  )}
                </span>
              )}
            </div>
          ))}

          <div style={{
            padding: '6px 14px', fontSize: 10, color: 'var(--dim)',
            borderTop: '1px solid var(--bdr)', display: 'flex',
            justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span>↑↓ navigate &nbsp; Enter select &nbsp; Esc close</span>
            <span>Data: OurAirports</span>
          </div>
        </div>
      )}

      {/* No results */}
      {open && !loading && results.length === 0 && query.trim().length >= 2 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg3)', border: '1px solid var(--bdr)',
          borderRadius: 10, padding: '14px 16px', fontSize: 13,
          color: 'var(--muted)', zIndex: 600, textAlign: 'center',
        }}>
          No airports found for <strong style={{ color: 'var(--text)' }}>&quot;{query}&quot;</strong>
          <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>
            Try an IATA code (LOS, LHR, JFK) or city name
          </div>
        </div>
      )}
    </div>
  );
}
