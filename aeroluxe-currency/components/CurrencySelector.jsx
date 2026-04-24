// components/CurrencySelector.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Drop-in currency picker for the Navbar.
// Shows the detected or selected currency with a flag + code.
// Click → dropdown with USD / GBP / EUR.
//
// Add to Navbar.jsx:
//   import CurrencySelector from './CurrencySelector';
//   // Inside the nav-links div, before the Sign In button:
//   <CurrencySelector />
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../lib/CurrencyContext';
import { CURRENCIES } from '../lib/currencyConfig';

const OPTIONS = [
  { code: 'USD', label: 'US Dollar',     flag: '🇺🇸', hint: 'Default worldwide' },
  { code: 'GBP', label: 'British Pound', flag: '🇬🇧', hint: 'United Kingdom' },
  { code: 'EUR', label: 'Euro',          flag: '🇪🇺', hint: 'Eurozone countries' },
];

export default function CurrencySelector() {
  const { currency, setCurrency, loading } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const current = CURRENCIES[currency] || CURRENCIES.USD;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background:    open ? 'var(--gold-bg)' : 'transparent',
          border:        `1px solid ${open ? 'var(--gold-bdr)' : 'var(--bdr)'}`,
          borderRadius:  6,
          padding:       '6px 12px',
          color:         open ? 'var(--gold)' : 'var(--muted)',
          cursor:        'pointer',
          display:       'flex',
          alignItems:    'center',
          gap:           6,
          fontSize:      13,
          fontFamily:    'DM Sans, sans-serif',
          fontWeight:    500,
          transition:    'all 0.2s',
          letterSpacing: '0.03em',
        }}
        onMouseEnter={e => {
          if (!open) {
            e.currentTarget.style.borderColor = 'var(--bdr2)';
            e.currentTarget.style.color       = 'var(--text)';
          }
        }}
        onMouseLeave={e => {
          if (!open) {
            e.currentTarget.style.borderColor = 'var(--bdr)';
            e.currentTarget.style.color       = 'var(--muted)';
          }
        }}
        title="Change currency"
      >
        {loading ? (
          <span style={{ fontSize: 11, opacity: 0.5 }}>…</span>
        ) : (
          <>
            <span style={{ fontSize: 16 }}>{current.flag}</span>
            <span>{current.code}</span>
            <span style={{
              fontSize: 10,
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
              transition: 'transform 0.2s',
              display: 'inline-block',
              opacity: 0.6,
            }}>▾</span>
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position:    'absolute',
          top:         'calc(100% + 6px)',
          right:       0,
          background:  'var(--bg3)',
          border:      '1px solid var(--bdr)',
          borderRadius: 10,
          overflow:    'hidden',
          zIndex:      200,
          minWidth:    210,
          boxShadow:   '0 14px 40px rgba(0,0,0,0.4)',
          animation:   'fadeUp 0.15s ease',
        }}>
          {/* Header */}
          <div style={{
            padding:         '9px 14px',
            fontSize:        10,
            fontWeight:      500,
            letterSpacing:   '0.08em',
            textTransform:   'uppercase',
            color:           'var(--dim)',
            borderBottom:    '1px solid var(--bdr)',
          }}>
            Display currency
          </div>

          {OPTIONS.map(opt => {
            const active = currency === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => { setCurrency(opt.code); setOpen(false); }}
                style={{
                  width:       '100%',
                  display:     'flex',
                  alignItems:  'center',
                  gap:         12,
                  padding:     '11px 14px',
                  background:  active ? 'var(--gold-bg)' : 'transparent',
                  border:      'none',
                  borderBottom: '1px solid var(--bdr)',
                  cursor:      'pointer',
                  fontFamily:  'DM Sans, sans-serif',
                  transition:  'background 0.15s',
                  textAlign:   'left',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{opt.flag}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize:   13,
                    fontWeight: 500,
                    color:      active ? 'var(--gold)' : 'var(--text)',
                    marginBottom: 2,
                  }}>
                    {opt.code} — {opt.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--dim)' }}>
                    {opt.hint}
                  </div>
                </div>
                {active && (
                  <span style={{
                    fontSize:   13,
                    color:      'var(--gold)',
                    flexShrink: 0,
                  }}>✓</span>
                )}
              </button>
            );
          })}

          {/* Auto-detect note */}
          <div style={{
            padding:   '8px 14px',
            fontSize:  10,
            color:     'var(--dim)',
            display:   'flex',
            alignItems: 'center',
            gap:        5,
          }}>
            <span>📍</span>
            Currency auto-detected from your location
          </div>
        </div>
      )}
    </div>
  );
}
