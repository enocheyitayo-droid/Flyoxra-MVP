# ✦ LUXAIR — Luxury Global Charter Booking Platform MVP

A full-stack Next.js MVP for booking private jets, helicopters, air ambulances, and superyachts.

## Quick Start

```bash
cd luxair
npm install
npm run dev
```

Open http://localhost:3000

## Demo Credentials

| Role     | Email                    | Password |
|----------|--------------------------|----------|
| Client   | james@charter.com        | demo     |
| Operator | alex@aeroelite.com       | demo     |

---

## Project Structure

```
luxair/
├── pages/
│   ├── index.js              # Home — booking search form
│   ├── results.js            # Search results — vehicle cards
│   ├── checkout.js           # Trip details + price summary
│   ├── confirmation.js       # Booking confirmation page
│   ├── dashboard.js          # Client dashboard
│   ├── operator.js           # Operator dashboard
│   ├── _app.js               # Global state context (session, toast)
│   │
│   ├── auth/
│   │   ├── login.js          # Login page
│   │   └── register.js       # Registration page
│   │
│   └── api/
│       ├── search.js         # GET  /api/search
│       ├── bookings/
│       │   ├── index.js      # GET + POST /api/bookings
│       │   └── [id].js       # GET + PATCH /api/bookings/:id
│       ├── fleet/
│       │   └── index.js      # GET + POST /api/fleet
│       └── auth/
│           ├── login.js      # POST /api/auth/login
│           ├── register.js   # POST /api/auth/register
│           └── logout.js     # POST /api/auth/logout
│
├── lib/
│   └── data.js               # In-memory mock database + helpers
│
├── styles/
│   └── globals.css           # Global CSS + design tokens
│
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json
```

---

## API Reference

### Search
```
GET /api/search?category=air&vehicle_type=jet&passengers=4&booking_type=scheduled
```
Returns matching fleet. `vehicle_type` can be: `all`, `jet`, `helicopter`, `ambulance`, `yacht`  
`category`: `air` or `yacht`

### Bookings
```
GET  /api/bookings?user_id=u1          → list bookings
POST /api/bookings                     → create booking
PATCH /api/bookings/:id                → update status (operator)
```

### Auth
```
POST /api/auth/login     { email, password }
POST /api/auth/register  { name, email, password }
POST /api/auth/logout
```

### Fleet (Operator)
```
GET  /api/fleet?operator_id=op1   → list fleet
POST /api/fleet                   → add vehicle
```

---

## Booking Flow

```
User fills form → GET /api/search → Results page
→ Select vehicle → Checkout page (confirm trip details)
→ POST /api/bookings → Confirmation page
→ Operator PATCH /api/bookings/:id { status: "confirmed" }
```

---

## Pricing Logic

```js
subtotal    = price_per_hour × estimated_duration_hours
service_fee = subtotal × 0.05
total       = subtotal + service_fee
```

---

## Extending to Production

| Area         | Upgrade                                          |
|--------------|--------------------------------------------------|
| Database     | Replace `lib/data.js` with PostgreSQL / Prisma   |
| Auth         | Add NextAuth.js or JWT with refresh tokens       |
| Payments     | Stripe Payment Intents                           |
| Real-time    | Pusher or Supabase Realtime for operator alerts  |
| Maps         | Mapbox for aircraft location tracking            |
| Emails       | Resend or SendGrid for booking confirmations     |
| File uploads | S3 for aircraft images                           |
