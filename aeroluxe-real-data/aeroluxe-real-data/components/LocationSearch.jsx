// components/LocationSearch.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Yacht Location Search — 222 countries + 521 named marinas/harbours
// Sources:  public/data/countries.json  (ships with the project)
//
// USAGE in BookingForm.jsx (yacht tab):
//   import LocationSearch from './LocationSearch';
//   <LocationSearch
//     label="Location / Marina"
//     placeholder="Country, city or marina…"
//     value={form.locObj}
//     onChange={(v) => setForm(f => ({ ...f, locObj: v }))}
//     error={!!errors.loc}
//   />
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

let _data   = null;
let _flat   = null;          // flat list: { label, country, iso, type }
let _fuse   = null;

/** Flatten countries + marinas into a searchable list */
function buildFlat(countries) {
  const flat = [];

  for (const c of countries) {
    // Country-level entry
    flat.push({
      label:   c.name,
      sub:     c.region,
      country: c.name,
      iso:     c.code,
      type:    'country',
      region:  c.region,
    });

    // Marina / city entries
    if (c.marinas?.length) {
      for (const m of c.marinas) {
        flat.push({
          label:   m,
          sub:     c.name,
          country: c.name,
          iso:     c.code,
          type:    'marina',
          region:  c.region,
        });
      }
    }
  }
  return flat;
}

async function init() {
  if (_fuse) return;
  const Fuse = (await import('fuse.js')).default;

  let countries;
  try {
    const res = await fetch('/data/countries.json');
    countries = await res.json();
  } catch {
    countries = [];
  }

  _data = countries;
  _flat = buildFlat(countries);
  _fuse = new Fuse(_flat, {
    includeScore:    true,
    threshold:       0.35,
    ignoreLocation:  true,
    minMatchCharLength: 2,
    keys: [
      { name: 'label',   weight: 0.55 },
      { name: 'country', weight: 0.25 },
      { name: 'region',  weight: 0.10 },
      { name: 'iso',     weight: 0.10 },
    ],
  });
}

async function searchLocations(query, limit = 12) {
  await init();
  if (!_fuse || !query || query.trim().length < 2) return [];
  const q = query.trim();

  // Exact country code match
  if (/^[a-zA-Z]{2}$/.test(q)) {
    const upper = q.toUpperCase();
    const exact = _flat.filter(r => r.iso === upper);
    if (exact.length) {
      const rest = _fuse.search(q, { limit }).map(r => r.item).filter(r => r.iso !== upper);
      return [...exact, ...rest].slice(0, limit);
    }
  }

  return _fuse.search(q, { limit }).map(r => r.item);
}

// ── Region colour mapping ────────────────────────────────────────────────────
const REGION_COLORS = {
  'Europe':         { color: '#6fa3d4', bg: 'rgba(111,163,212,0.12)' },
  'Middle East':    { color: '#c9a84c', bg: 'rgba(201,168,76,0.12)' },
  'Caribbean':      { color: '#5ab87a', bg: 'rgba(90,184,122,0.12)' },
  'Asia':           { color: '#9b87d9', bg: 'rgba(155,135,217,0.12)' },
  'Africa':         { color: '#d9a87a', bg: 'rgba(217,168,122,0.12)' },
  'North America':  { color: '#6fa3d4', bg: 'rgba(111,163,212,0.12)' },
  'South America':  { color: '#87d987', bg: 'rgba(135,217,135,0.12)' },
  'Oceania':        { color: '#d96060', bg: 'rgba(217,96,96,0.12)' },
};

function RegionBadge({ region }) {
  const s = REGION_COLORS[region] || { color: 'var(--dim)', bg: 'var(--ghost)' };
  return (
    <span style={{
      fontSize: 10, padding: '1px 7px', borderRadius: 20,
      background: s.bg, color: s.color, fontWeight: 500, letterSpacing: '0.03em',
      flexShrink: 0,
    }}>
      {region}
    </span>
  );
}

function typeIcon(type) {
  return type === 'marina' ? '⚓' : '🌍';
}

// ─────────────────────────────────────────────────────────────────────────────
export default function LocationSearch({
  label,
  placeholder = 'Country, city or marina…',
  value,
  onChange,
  error = false,
  id,
}) {
  const [query,   setQuery]   = useState(value?.label || '');
  const [results, setResults] = useState([]);
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [active,  setActive]  = useState(-1);
  const timerRef  = useRef(null);
  const wrapRef   = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (value?.label && value.label !== query) setQuery(value.label);
  }, [value]);

  const search = useCallback(async (q) => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const res = await searchLocations(q, 12);
      setResults(res);
      setOpen(res.length > 0);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    setActive(-1);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(q), 200);
  };

  const select = (r) => {
    setQuery(r.type === 'marina' ? `${r.label}, ${r.country}` : r.label);
    setOpen(false);
    setActive(-1);
    onChange({
      label:   r.type === 'marina' ? `${r.label}, ${r.country}` : r.label,
      marina:  r.type === 'marina' ? r.label : null,
      country: r.country,
      iso:     r.iso,
      region:  r.region,
      type:    r.type,
    });
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && active >= 0) { e.preventDefault(); select(results[active]); }
    if (e.key === 'Escape') setOpen(false);
  };

  const handleClear = () => {
    setQuery(''); setResults([]); setOpen(false); onChange(null);
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
          {query && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); handleClear(); }}
              style={{
                position: 'absolute', right: 34, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--dim)',
                fontSize: 14, cursor: 'pointer', padding: '2px 4px',
              }}
              tabIndex={-1}
            >✕</button>
          )}
          <span style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 14, pointerEvents: 'none',
            color: loading ? 'var(--gold)' : error ? 'var(--err)' : 'var(--dim)',
          }}>
            {loading ? '⟳' : '⚓'}
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
          maxHeight: 360, overflowY: 'auto',
        }}>
          {/* Group marinas separately for clarity */}
          {['marina', 'country'].map(group => {
            const items = results.filter(r => r.type === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div style={{
                  padding: '6px 14px', fontSize: 10, fontWeight: 500,
                  color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.09em',
                  background: 'var(--bg4)', borderBottom: '1px solid var(--bdr)',
                  borderTop: group === 'country' && results.some(r => r.type === 'marina') ? '1px solid var(--bdr)' : 'none',
                }}>
                  {group === 'marina' ? '⚓ Marinas & Harbours' : '🌍 Countries'}
                </div>
                {items.map((r, ii) => {
                  const globalIdx = results.indexOf(r);
                  return (
                    <div
                      key={`${r.iso}-${r.label}-${ii}`}
                      onMouseDown={(e) => { e.preventDefault(); select(r); }}
                      onMouseEnter={() => setActive(globalIdx)}
                      style={{
                        padding: '10px 14px', cursor: 'pointer',
                        background: globalIdx === active ? 'var(--gold-bg)' : 'transparent',
                        borderBottom: ii < items.length - 1 ? '1px solid var(--bdr)' : 'none',
                        display: 'flex', alignItems: 'center', gap: 10,
                        transition: 'background 0.12s',
                      }}
                    >
                      {/* Icon */}
                      <span style={{ fontSize: 20, flexShrink: 0 }}>
                        {r.type === 'marina' ? '⚓' : (
                          r.iso.toUpperCase().replace(/./g, c =>
                            String.fromCodePoint(c.charCodeAt(0) + 127397)
                          )
                        )}
                      </span>
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 1 }}>
                          <span style={{
                            fontSize: 13, fontWeight: 500,
                            color: globalIdx === active ? 'var(--cream)' : 'var(--text)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                            maxWidth: 180,
                          }}>
                            {r.label}
                          </span>
                          <RegionBadge region={r.region} />
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                          {r.type === 'marina' ? r.country : r.region}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div style={{
            padding: '5px 14px', fontSize: 10, color: 'var(--dim)',
            borderTop: '1px solid var(--bdr)',
            display: 'flex', justifyContent: 'space-between',
          }}>
            <span>↑↓ navigate &nbsp; Enter select &nbsp; Esc close</span>
            <span>222 countries · 521 marinas</span>
          </div>
        </div>
      )}

      {open && !loading && results.length === 0 && query.trim().length >= 2 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: 'var(--bg3)', border: '1px solid var(--bdr)',
          borderRadius: 10, padding: '14px 16px', fontSize: 13,
          color: 'var(--muted)', zIndex: 600, textAlign: 'center',
        }}>
          No locations found for <strong style={{ color: 'var(--text)' }}>&quot;{query}&quot;</strong>
          <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 4 }}>
            Try a country (Nigeria, Greece) or marina name (Bora Bora, Porto Montenegro)
          </div>
        </div>
      )}
    </div>
  );
}
