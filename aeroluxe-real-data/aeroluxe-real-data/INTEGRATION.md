# AeroLuxe — Real IATA + Country/Marina Search Integration
# ─────────────────────────────────────────────────────────────────────────────

## What's in this package

| File | Purpose |
|------|---------|
| `components/AirportSearch.jsx`  | IATA airport search (Fuse.js fuzzy, flags, type badges) |
| `components/LocationSearch.jsx` | Yacht country + marina search (222 countries, 521 marinas) |
| `lib/airportSearch.js`          | Fuse.js search engine — loads airports-mini.json once |
| `public/data/airports.json`     | 296-airport seed (all regions, private islands) |
| `public/data/airports-mini.json`| Compact format for the browser |
| `public/data/countries.json`    | 222 countries + 521 marina locations |
| `scripts/build-airport-data.js` | Run once to download ALL 9 000+ IATA airports |

─────────────────────────────────────────────────────────────────────────────
## STEP 1 — Copy files into your project

```
cp components/AirportSearch.jsx   ../aeroluxe/components/
cp components/LocationSearch.jsx  ../aeroluxe/components/
cp lib/airportSearch.js           ../aeroluxe/lib/
cp scripts/build-airport-data.js  ../aeroluxe/scripts/
cp -r public/data/                ../aeroluxe/public/
```

─────────────────────────────────────────────────────────────────────────────
## STEP 2 — Install Fuse.js

```bash
cd aeroluxe
npm install fuse.js
```

─────────────────────────────────────────────────────────────────────────────
## STEP 3 — Get ALL 9 000+ airports (optional but recommended)

The 296-airport seed works out of the box. To get every airport on earth:

```bash
node scripts/build-airport-data.js
```

This downloads the OurAirports dataset (Creative Commons, free) and
overwrites  public/data/airports-mini.json  with ~9 000 airports including:
  • All international airports (IATA code)
  • Regional / domestic airports
  • Private GA strips
  • Island runways (Bora Bora, Maldives atolls, Seychelles outer islands, etc.)
  • Seaplane bases
  • Remote airstrips in Alaska, Greenland, PNG, Solomon Islands, etc.

─────────────────────────────────────────────────────────────────────────────
## STEP 4 — Update BookingForm.jsx

Replace the plain text inputs in the jet/helicopter/ambulance tab:

```jsx
// BEFORE
import { useState } from 'react';
// ...
<input placeholder="e.g. Lagos (LOS)" value={form.from} onChange={...} />

// AFTER
import AirportSearch  from './AirportSearch';
import LocationSearch from './LocationSearch';

// In state, store objects instead of strings:
const [form, setForm] = useState({
  fromObj: null,   // { label, iata, icao, city, country, iso, lat, lon }
  toObj:   null,
  locObj:  null,   // { label, marina, country, iso, region, type }
  // ...other fields
});

// In the jet/heli/ambulance section:
<AirportSearch
  label="Departure Airport / City"
  placeholder="Lagos, LOS, London Heathrow…"
  value={form.fromObj}
  onChange={(v) => setForm(f => ({ ...f, fromObj: v }))}
  error={!!errors.from}
/>
<AirportSearch
  label="Arrival Airport / City"
  placeholder="Dubai, DXB, New York JFK…"
  value={form.toObj}
  onChange={(v) => setForm(f => ({ ...f, toObj: v }))}
  error={!!errors.to}
/>

// In the yacht section:
<LocationSearch
  label="Location / Marina"
  placeholder="Maldives, Monaco, Bora Bora, Porto Montenegro…"
  value={form.locObj}
  onChange={(v) => setForm(f => ({ ...f, locObj: v }))}
  error={!!errors.loc}
/>
```

─────────────────────────────────────────────────────────────────────────────
## STEP 5 — Update submit payload in BookingForm

```jsx
const submit = async () => {
  const payload = {
    vtype: tab,
    // Flatten object → strings + coords for API and map
    from:    form.fromObj?.label || '',
    fromLat: form.fromObj?.lat,
    fromLon: form.fromObj?.lon,
    to:      form.toObj?.label || '',
    toLat:   form.toObj?.lat,
    toLon:   form.toObj?.lon,
    loc:     form.locObj?.label || '',
    locCountry: form.locObj?.country,
    // ...rest of fields
  };
  // POST to /api/search
};
```

─────────────────────────────────────────────────────────────────────────────
## STEP 6 — Validate with object check instead of string check

```jsx
const validate = () => {
  const e = {};
  if (tab !== 'yacht') {
    if (!form.fromObj?.iata && !form.fromObj?.icao) e.from = true;
    if (!form.toObj?.iata   && !form.toObj?.icao)   e.to   = true;
  } else {
    if (!form.locObj?.country) e.loc = true;
  }
  if (!form.date) e.date = true;
  setErrors(e);
  return Object.keys(e).length === 0;
};
```

─────────────────────────────────────────────────────────────────────────────
## Search behaviour

### AirportSearch
| You type      | What appears |
|---------------|--------------|
| `LOS`         | Murtala Muhammed, Lagos (exact IATA match first) |
| `lag`         | Lagos + any airport with "lag" in name/city |
| `london`      | Heathrow, Gatwick, City, Stansted, Southend |
| `bora`        | Bora Bora Airport (private island, French Polynesia) |
| `Andaman`     | Port Blair Airport (remote island, India) |
| `gustavia`    | Gustaf III Airport, Saint Barthélemy (private island) |
| `prasl`       | Praslin Island Airport, Seychelles (fuzzy match) |

### LocationSearch
| You type      | What appears |
|---------------|--------------|
| `monaco`      | Monaco (country) + Port Hercule, Fontvieille, Condamine |
| `maldives`    | Maldives + Malé, North Atoll, Ari Atoll, Baa Atoll… |
| `greek`       | Greece + all 13 Greek marinas |
| `portofino`   | Portofino (marina, Italy) |
| `virgin`      | British Virgin Islands + 5 BVI marinas + US Virgin Islands |
| `ng`          | Nigeria (ISO code match) + Lagos, Victoria Island… |
| `caribbean`   | All Caribbean countries and their marinas |

─────────────────────────────────────────────────────────────────────────────
Built with Fuse.js · OurAirports (Creative Commons) · Custom marina data
