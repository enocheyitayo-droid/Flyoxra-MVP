// components/PriceSummary.jsx  — UPDATED with currency conversion
//
// CHANGES: Replace formatCurrency(amount) with fmt(amount) from useCurrency()

import { useCurrency } from '../lib/CurrencyContext';
import CurrencyBadge   from './CurrencyBadge';

export default function PriceSummary({ aircraft, params, onConfirm, loading, user }) {
  const { fmt, currency, symbol } = useCurrency();       // ← USE THIS

  if (!aircraft) return null;

  const dur     = params?.vtype === 'yacht' ? parseInt(params?.dur) || 4 : aircraft.estimated_duration_hrs || 3;
  const isRound = params?.trip === 'round-trip';
  const multi   = isRound ? 2 : 1;
  const base    = aircraft.price_per_hour * dur * multi;
  const fees    = Math.round(base * 0.12);
  const total   = base + fees;

  const rows = [
    { label: 'Charter rate',       value: `${fmt(aircraft.price_per_hour)}/hr` },
    { label: 'Est. duration',      value: `~${dur} hours${isRound ? ' × 2' : ''}` },
    { label: 'Base fare',          value: fmt(base) },
    { label: 'Fees & surcharges',  value: fmt(fees) },
  ];

  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--bdr)', borderRadius: 12,
      padding: 26, position: 'sticky', top: 74,
    }}>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 22, color: 'var(--cream)' }}>
        Price Summary
      </div>

      {rows.map(r => (
        <div key={r.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '13px 0', borderBottom: '1px solid var(--bdr)',
        }}>
          <span style={{ color: 'var(--muted)', fontSize: 14 }}>{r.label}</span>
          <span style={{ fontSize: 14 }}>{r.value}</span>
        </div>
      ))}

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--gold-bdr),transparent)', margin: '14px 0' }} />

      {/* Total — big currency badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20 }}>Total (est.)</span>
        <CurrencyBadge amount={total} display="hero" showTooltip={currency !== 'USD'} />
      </div>

      {/* Show USD equivalent when viewing in GBP or EUR */}
      {currency !== 'USD' && (
        <div style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 6, textAlign: 'right' }}>
          ≈ ${total.toLocaleString('en-US')} USD
        </div>
      )}

      <div style={{ fontSize: 12, color: 'var(--dim)', marginBottom: 22 }}>
        Final price confirmed upon operator acceptance
      </div>

      {!user && (
        <div style={{ background: 'var(--gold-bg)', border: '1px solid var(--gold-bdr)', borderRadius: 8, padding: 13, marginBottom: 14, fontSize: 13, color: 'var(--gold)' }}>
          Sign in to complete your booking
        </div>
      )}

      <button
        onClick={() => onConfirm({ base, fees, total, dur })}
        disabled={loading}
        style={{
          width: '100%', justifyContent: 'center',
          background: 'linear-gradient(135deg, #9e7d35, #c9a84c, #e0c06e)',
          color: '#080600', border: 'none', borderRadius: 7,
          padding: '14px 36px', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? <span className="spinner" /> : user ? 'Confirm Booking →' : 'Sign In to Book →'}
      </button>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {['✓ Free cancellation within 24h', '✓ Instant operator notification', '✓ 24/7 concierge support'].map(x => (
          <div key={x} style={{ fontSize: 12, color: 'var(--muted)' }}>{x}</div>
        ))}
      </div>
    </div>
  );
}
