// lib/CurrencyContext.js
// ─────────────────────────────────────────────────────────────────────────────
// Global currency context for AeroLuxe.
//
// Detection order:
//   1. localStorage override (user manually picked)
//   2. GET /api/geo  →  IP-based country lookup
//   3. browser timezone heuristic fallback
//   4. Default: USD
//
// Wrap _app.js:
//   import { CurrencyProvider } from '../lib/CurrencyContext';
//   <CurrencyProvider><Component {...pageProps} /></CurrencyProvider>
//
// Use anywhere:
//   import { useCurrency } from '../lib/CurrencyContext';
//   const { fmt, currency, setCurrency, rates } = useCurrency();
//   <span>{fmt(8500)}</span>   →  "$8,500"  /  "£6,715"  /  "€7,827"
// ─────────────────────────────────────────────────────────────────────────────

import {
  createContext, useContext, useState, useEffect, useCallback, useMemo,
} from 'react';
import {
  CURRENCIES, FALLBACK_RATES,
  currencyFromISO, convertAmount, formatCurrency,
} from './currencyConfig';

const LS_KEY = 'aeroluxe_currency';

const CurrencyContext = createContext(null);

// ── Timezone → likely currency heuristic (coarse fallback) ─────────────────
function currencyFromTimezone(tz) {
  if (!tz) return 'USD';
  if (/Europe\/London|Europe\/Belfast/.test(tz))                      return 'GBP';
  if (/^Europe\//.test(tz) && !/London|Belfast|Kyiv|Moscow|Minsk|Chisinau|Bucharest|Sofia|Warsaw|Budapest|Prague|Bratislava|Zagreb|Belgrade|Skopje|Podgorica|Sarajevo|Tirane|Reykjavik/.test(tz)) return 'EUR';
  return 'USD';
}

export function CurrencyProvider({ children }) {
  const [currency,  setCurrencyState] = useState('USD');
  const [rates,     setRates]         = useState(FALLBACK_RATES);
  const [country,   setCountry]       = useState('');
  const [detected,  setDetected]      = useState(false);   // finished detection?
  const [loading,   setLoading]       = useState(true);

  // ── Fetch live exchange rates (open.er-api.com — free, 1 500 req/month) ──
  const fetchRates = useCallback(async () => {
    try {
      const res  = await fetch('https://open.er-api.com/v6/latest/USD');
      if (!res.ok) throw new Error('rates failed');
      const data = await res.json();
      if (data.rates) {
        setRates({
          USD: 1,
          GBP: Math.round(data.rates.GBP * 10000) / 10000,
          EUR: Math.round(data.rates.EUR * 10000) / 10000,
        });
      }
    } catch {
      // silently fall back to FALLBACK_RATES
    }
  }, []);

  // ── Auto-detect on mount ───────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      // 1. User's saved preference wins
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(LS_KEY);
        if (saved && CURRENCIES[saved]) {
          setCurrencyState(saved);
          setDetected(true);
          setLoading(false);
          fetchRates();
          return;
        }
      }

      // 2. IP geo detection via our own /api/geo route
      try {
        const res  = await fetch('/api/geo');
        if (res.ok) {
          const data = await res.json();
          if (data.iso) {
            setCountry(data.iso);
            setCurrencyState(currencyFromISO(data.iso));
            setDetected(true);
            setLoading(false);
            fetchRates();
            return;
          }
        }
      } catch {}

      // 3. Timezone heuristic
      try {
        const tz  = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setCurrencyState(currencyFromTimezone(tz));
      } catch {}

      setDetected(true);
      setLoading(false);
      fetchRates();
    })();
  }, [fetchRates]);

  // ── Manual override — persists to localStorage ────────────────────────────
  const setCurrency = useCallback((code) => {
    if (!CURRENCIES[code]) return;
    setCurrencyState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LS_KEY, code);
    }
  }, []);

  // ── Formatting helpers ─────────────────────────────────────────────────────
  const fmt = useCallback((usdAmount) =>
    formatCurrency(usdAmount, currency, rates),
  [currency, rates]);

  const fmtRaw = useCallback((usdAmount) =>
    convertAmount(usdAmount, currency, rates),
  [currency, rates]);

  const value = useMemo(() => ({
    currency,                    // 'USD' | 'GBP' | 'EUR'
    setCurrency,                 // (code) => void
    currencies: CURRENCIES,      // full config object
    rates,                       // { USD: 1, GBP: 0.79, EUR: 0.92 }
    country,                     // detected ISO code, e.g. 'GB'
    detected,                    // true once detection complete
    loading,                     // true during initial detect
    fmt,                         // fmt(usdAmount) → formatted string
    fmtRaw,                      // fmtRaw(usdAmount) → converted number
    symbol: CURRENCIES[currency]?.symbol || '$',
    flag:   CURRENCIES[currency]?.flag   || '🌐',
  }), [currency, setCurrency, rates, country, detected, loading, fmt, fmtRaw]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be inside <CurrencyProvider>');
  return ctx;
}
