// pages/api/geo.js
// ─────────────────────────────────────────────────────────────────────────────
// IP → Country code endpoint.
//
// Strategy (in order — first that works wins):
//   1. Cloudflare CF-IPCountry header  (free, works automatically on Cloudflare)
//   2. Vercel x-vercel-ip-country header (free on Vercel)
//   3. ipapi.co free API  (free, 1 000 req/day, no key needed)
//   4. ip-api.com free API (free, 45 req/min, no key needed)
//
// Returns: { iso: 'GB', country: 'United Kingdom', currency: 'GBP' }
// ─────────────────────────────────────────────────────────────────────────────

import { currencyFromISO } from '../../lib/currencyConfig';

// Simple in-process cache — avoid repeated external calls
const CACHE     = {};
const CACHE_TTL = 12 * 60 * 60 * 1000;  // 12 hours

function getIP(req) {
  return (
    req.headers['cf-connecting-ip']          ||
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip']                 ||
    req.socket?.remoteAddress                ||
    ''
  );
}

async function fetchFromIpapi(ip) {
  // ip-api.com: free, no key, 45 req/min
  const url = `http://ip-api.com/json/${ip}?fields=status,countryCode,country`;
  const res  = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error('ip-api failed');
  const d = await res.json();
  if (d.status !== 'success') throw new Error('ip-api: ' + d.message);
  return { iso: d.countryCode, name: d.country };
}

async function fetchFromIpapiCo(ip) {
  // ipapi.co: free, 1 000 req/day, no key
  const url = `https://ipapi.co/${ip}/json/`;
  const res  = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error('ipapi.co failed');
  const d = await res.json();
  if (d.error) throw new Error('ipapi.co: ' + d.reason);
  return { iso: d.country_code, name: d.country_name };
}

export default async function handler(req, res) {
  // ── 1. Cloudflare CDN header (most reliable — zero latency) ───────────────
  const cfCountry = req.headers['cf-ipcountry'];
  if (cfCountry && cfCountry !== 'XX') {
    const iso = cfCountry.toUpperCase();
    return res.status(200).json({
      iso,
      source:   'cloudflare',
      currency: currencyFromISO(iso),
    });
  }

  // ── 2. Vercel header ───────────────────────────────────────────────────────
  const vercelCountry = req.headers['x-vercel-ip-country'];
  if (vercelCountry) {
    const iso = vercelCountry.toUpperCase();
    return res.status(200).json({
      iso,
      source:   'vercel',
      currency: currencyFromISO(iso),
    });
  }

  // ── 3. IP-based lookup ─────────────────────────────────────────────────────
  const ip = getIP(req);

  // Local / private IP → default USD
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168') || ip.startsWith('10.')) {
    return res.status(200).json({ iso: 'US', source: 'default', currency: 'USD' });
  }

  // Cache hit
  if (CACHE[ip] && Date.now() - CACHE[ip].ts < CACHE_TTL) {
    return res.status(200).json({ ...CACHE[ip].data, source: 'cache' });
  }

  // Try external APIs in order
  let result = null;
  for (const fn of [fetchFromIpapi, fetchFromIpapiCo]) {
    try {
      result = await fn(ip);
      break;
    } catch {}
  }

  if (!result) {
    // All sources failed — return USD default gracefully
    return res.status(200).json({ iso: 'US', source: 'fallback', currency: 'USD' });
  }

  const payload = {
    iso:      result.iso,
    country:  result.name,
    currency: currencyFromISO(result.iso),
  };

  CACHE[ip] = { data: payload, ts: Date.now() };
  return res.status(200).json(payload);
}
