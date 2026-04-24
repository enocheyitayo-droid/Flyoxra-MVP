// components/CurrencyBadge.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Smart price display component.
// Converts from USD and shows the result in the user's currency.
// On hover shows a tooltip with USD equivalent.
//
// USAGE:
//   import CurrencyBadge from './CurrencyBadge';
//
//   // Basic price
//   <CurrencyBadge amount={8500} />              → "£6,715/hr"
//
//   // With per-unit label
//   <CurrencyBadge amount={8500} per="hr" />     → "£6,715/hr"
//
//   // Large serif display (hero price)
//   <CurrencyBadge amount={57120} display="hero" />
//
//   // Compact inline (inside a table row)
//   <CurrencyBadge amount={57120} display="inline" />
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useCurrency } from '../lib/CurrencyContext';
import { formatCurrency, CURRENCIES, FALLBACK_RATES } from '../lib/currencyConfig';

export default function CurrencyBadge({
  amount,          // always USD — the canonical internal unit
  per,             // optional: 'hr', 'day', 'trip'
  display = 'default', // 'default' | 'hero' | 'inline' | 'muted'
  showTooltip = true,
  style = {},
}) {
  const { currency, rates, loading } = useCurrency();
  const [hover, setHover] = useState(false);

  if (loading || amount == null) {
    return <span style={{ color: 'var(--dim)', fontSize: 13 }}>—</span>;
  }

  const formatted     = formatCurrency(amount, currency, rates);
  const usdFormatted  = formatCurrency(amount, 'USD',     FALLBACK_RATES);
  const showUSD       = currency !== 'USD' && showTooltip;

  const baseStyle = {
    default: {
      fontFamily:  'Cormorant Garamond, serif',
      fontSize:     28,
      fontWeight:   500,
      color:        'var(--gold)',
      lineHeight:   1.1,
      position:     'relative',
      display:      'inline-block',
      cursor:       showUSD ? 'help' : 'default',
    },
    hero: {
      fontFamily:  'Cormorant Garamond, serif',
      fontSize:     38,
      fontWeight:   400,
      color:        'var(--gold)',
      lineHeight:   1,
      position:     'relative',
      display:      'inline-block',
      cursor:       showUSD ? 'help' : 'default',
    },
    inline: {
      fontFamily:  'DM Sans, sans-serif',
      fontSize:     14,
      fontWeight:   500,
      color:        'var(--gold)',
      position:     'relative',
      display:      'inline-block',
      cursor:       showUSD ? 'help' : 'default',
    },
    muted: {
      fontFamily:  'DM Sans, sans-serif',
      fontSize:     13,
      fontWeight:   400,
      color:        'var(--muted)',
      position:     'relative',
      display:      'inline-block',
    },
  }[display] || {};

  return (
    <span
      style={{ ...baseStyle, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {formatted}
      {per && (
        <span style={{ fontSize: '0.52em', color: 'var(--dim)', marginLeft: 3 }}>
          /{per}
        </span>
      )}

      {/* USD tooltip */}
      {showUSD && hover && (
        <span style={{
          position:     'absolute',
          bottom:       'calc(100% + 6px)',
          left:         '50%',
          transform:    'translateX(-50%)',
          background:   'var(--bg4)',
          border:       '1px solid var(--bdr2)',
          borderRadius:  6,
          padding:      '5px 10px',
          fontSize:      11,
          color:        'var(--muted)',
          whiteSpace:   'nowrap',
          zIndex:        50,
          pointerEvents: 'none',
          boxShadow:    '0 6px 20px rgba(0,0,0,0.35)',
        }}>
          ≈ {usdFormatted} USD
          <span style={{
            position:    'absolute',
            top:         '100%',
            left:        '50%',
            transform:   'translateX(-50%)',
            width:        0,
            height:       0,
            borderLeft:  '4px solid transparent',
            borderRight: '4px solid transparent',
            borderTop:   '4px solid var(--bdr2)',
          }} />
        </span>
      )}
    </span>
  );
}
