// lib/currencyConfig.js
// ─────────────────────────────────────────────────────────────────────────────
// Currency rules for AeroLuxe.
// Logic:
//   GB, GG, JE, IM                       → GBP  (UK + Crown Dependencies)
//   All 27 EU eurozone members + Monaco,
//   Andorra, Vatican, San Marino, Kosovo  → EUR
//   Everyone else                         → USD  (default)
// ─────────────────────────────────────────────────────────────────────────────

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$',  name: 'US Dollar',    flag: '🇺🇸', locale: 'en-US' },
  GBP: { code: 'GBP', symbol: '£',  name: 'British Pound', flag: '🇬🇧', locale: 'en-GB' },
  EUR: { code: 'EUR', symbol: '€',  name: 'Euro',          flag: '🇪🇺', locale: 'de-DE' },
};

// ── GBP countries ─────────────────────────────────────────────────────────
export const GBP_COUNTRIES = new Set([
  'GB',   // United Kingdom
  'GG',   // Guernsey
  'JE',   // Jersey
  'IM',   // Isle of Man
]);

// ── EUR countries (eurozone + euro-using territories) ──────────────────────
export const EUR_COUNTRIES = new Set([
  // EU Eurozone 20
  'AT',   // Austria
  'BE',   // Belgium
  'HR',   // Croatia
  'CY',   // Cyprus
  'EE',   // Estonia
  'FI',   // Finland
  'FR',   // France
  'DE',   // Germany
  'GR',   // Greece
  'IE',   // Ireland
  'IT',   // Italy
  'LV',   // Latvia
  'LT',   // Lithuania
  'LU',   // Luxembourg
  'MT',   // Malta
  'NL',   // Netherlands
  'PT',   // Portugal
  'SK',   // Slovakia
  'SI',   // Slovenia
  'ES',   // Spain
  // Microstates using EUR by agreement
  'AD',   // Andorra
  'MC',   // Monaco
  'SM',   // San Marino
  'VA',   // Vatican City
  'XK',   // Kosovo
  // Territories using EUR
  'GP',   // Guadeloupe
  'MQ',   // Martinique
  'GF',   // French Guiana
  'RE',   // Réunion
  'YT',   // Mayotte
  'PM',   // Saint Pierre and Miquelon
  'MF',   // Saint Martin
  'BL',   // Saint Barthélemy
  'AX',   // Åland Islands (Finland)
]);

/**
 * Resolve the correct currency from an ISO 3166-1 alpha-2 country code.
 * @param {string} iso  — e.g. 'NG', 'GB', 'DE', 'AE'
 * @returns {'USD'|'GBP'|'EUR'}
 */
export function currencyFromISO(iso) {
  if (!iso) return 'USD';
  const code = iso.toUpperCase().trim();
  if (GBP_COUNTRIES.has(code)) return 'GBP';
  if (EUR_COUNTRIES.has(code)) return 'EUR';
  return 'USD';
}

/**
 * Format a USD amount into the target currency using live or static rates.
 * @param {number} usdAmount
 * @param {string} currency     — 'USD' | 'GBP' | 'EUR'
 * @param {object} rates        — { USD: 1, GBP: 0.79, EUR: 0.92 }
 */
export function convertAmount(usdAmount, currency, rates) {
  const rate = rates?.[currency] ?? FALLBACK_RATES[currency] ?? 1;
  return usdAmount * rate;
}

/**
 * Static fallback rates (updated periodically — swap for live API in production).
 * Source: approximate mid-market rates, April 2026.
 */
export const FALLBACK_RATES = {
  USD: 1.000,
  GBP: 0.790,
  EUR: 0.921,
};

/**
 * Format a number as currency string.
 */
export function formatCurrency(amount, currencyCode, rates) {
  const converted = convertAmount(amount, currencyCode, rates);
  const cfg = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return new Intl.NumberFormat(cfg.locale, {
    style:                 'currency',
    currency:              currencyCode,
    maximumFractionDigits: 0,
  }).format(converted);
}
