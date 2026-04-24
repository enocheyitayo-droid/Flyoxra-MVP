// components/AircraftCard.jsx  — UPDATED with currency conversion
//
// CHANGES:
//   1. Import useCurrency instead of formatCurrency from utils
//   2. Call fmt(amount) for all prices
//
// ─── DIFF ──────────────────────────────────────────────────────────────────
// BEFORE:
//   import { formatCurrency, ... } from '../lib/utils';
//   ...
//   {formatCurrency(aircraft.price_per_hour)}
//   {formatCurrency(aircraft.estimated_total)}
//
// AFTER:
//   import { useCurrency } from '../lib/CurrencyContext';
//   const { fmt } = useCurrency();
//   ...
//   {fmt(aircraft.price_per_hour)}
//   {fmt(aircraft.estimated_total)}
// ───────────────────────────────────────────────────────────────────────────

import { useCurrency }                        from '../lib/CurrencyContext';
import { vehicleIcon, vehicleLabel, starString } from '../lib/utils';
import CurrencyBadge                           from './CurrencyBadge';

export default function AircraftCard({ aircraft, onSelect, index = 0 }) {
  const { fmt } = useCurrency();                          // ← USE THIS
  const op  = aircraft.operator || {};
  const dur = aircraft.estimated_duration_hrs || 3;

  return (
    <div
      className="anim-up"
      onClick={() => onSelect(aircraft)}
      style={{
        animationDelay: `${index * 0.07}s`,
        background: 'var(--bg2)', border: '1px solid var(--bdr)',
        borderRadius: 12, padding: 22, marginBottom: 14,
        display: 'grid', gridTemplateColumns: 'auto 1fr auto',
        gap: 22, alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-bdr)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 36px rgba(0,0,0,0.32)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Icon */}
      <div style={{
        width: 70, height: 70, borderRadius: 12,
        background: 'var(--bg3)', border: '1px solid var(--bdr)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30, flexShrink: 0,
      }}>
        {vehicleIcon(aircraft.type)}
      </div>

      {/* Info */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 5 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500 }}>
            {aircraft.model}
          </div>
          <span className="tag tag-gold">{vehicleLabel(aircraft.type)}</span>
          {aircraft.available && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ok)' }}>
              <span className="adot" /> Available Now
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
          {[
            { icon: '👥', text: `${aircraft.passenger_capacity} pax max` },
            { icon: '📍', text: aircraft.current_location },
            { icon: '🗓', text: aircraft.year },
            { icon: '✈', text: aircraft.tail_number },
          ].map(d => (
            <span key={d.text} style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
              {d.icon} {d.text}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{op.name}</span>
          {op.verified && <span className="tag tag-ok" style={{ fontSize: 10 }}>✓ Verified</span>}
          <span className="stars">{starString(op.rating)}</span>
          <span style={{ fontSize: 12, color: 'var(--dim)' }}>{op.rating} ({op.total_trips} trips)</span>
        </div>
        {aircraft.amenities?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {aircraft.amenities.slice(0, 4).map(a => (
              <span key={a} style={{ fontSize: 11, padding: '2px 9px', borderRadius: 20, background: 'var(--ghost)', border: '1px solid var(--bdr)', color: 'var(--dim)' }}>{a}</span>
            ))}
            {aircraft.amenities.length > 4 && (
              <span style={{ fontSize: 11, color: 'var(--dim)', padding: '2px 4px' }}>+{aircraft.amenities.length - 4} more</span>
            )}
          </div>
        )}
      </div>

      {/* Price — now uses CurrencyBadge */}
      <div style={{ textAlign: 'right', minWidth: 150 }}>
        {/* Hourly rate */}
        <CurrencyBadge amount={aircraft.price_per_hour} per="hr" display="default" />

        <div style={{ height: 1, background: 'var(--bdr)', margin: '10px 0' }} />

        {/* Estimated total */}
        <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500 }}>
          <CurrencyBadge amount={aircraft.estimated_total} display="inline" /> est.
        </div>
        <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 2 }}>~{dur}h charter</div>

        <button
          style={{
            marginTop: 12, width: '100%',
            background: 'transparent', border: '1px solid var(--gold-bdr)',
            color: 'var(--gold)', padding: '8px 16px', borderRadius: 6,
            fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
            display: 'block', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-bg)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          Select →
        </button>
      </div>
    </div>
  );
}
