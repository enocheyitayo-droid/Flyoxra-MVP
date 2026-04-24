import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";
import { FLEET, OPERATORS } from "../lib/data";

const fmt = n => `€${Number(n).toLocaleString()}`;

export default function Checkout() {
  const router = useRouter();
  const { user, cart } = useApp() || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const vehicleId = router.query.vehicle_id;
  const vehicle = FLEET.find(v => v.id === vehicleId);
  const operator = vehicle ? OPERATORS[vehicle.operator_id] : null;

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/confirmation");
  };

  // Calculate pricing based on vehicle
  const basePrice = vehicle ? vehicle.price_per_hour * 8 : 34200; // 8 hours default
  const cateringFee = Math.round(basePrice * 0.08);
  const airportFees = Math.round(basePrice * 0.04);
  const totalAmount = basePrice + cateringFee + airportFees;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@300;400;600;800&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script id="tailwind-config">
          {`tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                "colors": {
                  "surface-tint": "#e9c176",
                  "on-tertiary-fixed": "#1c1c1a",
                  "error": "#ffb4ab",
                  "error-container": "#93000a",
                  "tertiary": "#c8c6c3",
                  "on-primary-container": "#9d7c39",
                  "surface-container-highest": "#2d3449",
                  "surface-dim": "#0b1326",
                  "primary-fixed-dim": "#e9c176",
                  "surface-container-high": "#222a3d",
                  "surface-container": "#171f33",
                  "surface-variant": "#2d3449",
                  "background": "#0b1326",
                  "on-secondary-container": "#aeb9d0",
                  "inverse-surface": "#dae2fd",
                  "secondary-container": "#3e495d",
                  "on-surface-variant": "#c6c6cd",
                  "primary": "#e9c176",
                  "on-tertiary-fixed-variant": "#474745",
                  "on-secondary-fixed-variant": "#3c475a",
                  "surface-container-lowest": "#060e20",
                  "tertiary-fixed-dim": "#c8c6c3",
                  "outline-variant": "#45464d",
                  "primary-container": "#211500",
                  "on-primary": "#412d00",
                  "on-tertiary": "#31302f",
                  "secondary": "#bcc7de",
                  "on-surface": "#dae2fd",
                  "inverse-primary": "#775a19",
                  "on-error-container": "#ffdad6",
                  "on-secondary-fixed": "#111c2d",
                  "outline": "#909097",
                  "tertiary-container": "#181816",
                  "secondary-fixed-dim": "#bcc7de",
                  "on-error": "#690005",
                  "secondary-fixed": "#d8e3fb",
                  "on-background": "#dae2fd",
                  "on-tertiary-container": "#82817e",
                  "primary-fixed": "#ffdea5",
                  "surface-bright": "#31394d",
                  "on-primary-fixed-variant": "#5d4201",
                  "tertiary-fixed": "#e5e2df",
                  "on-secondary": "#263143",
                  "on-primary-fixed": "#261900",
                  "surface-container-low": "#131b2e",
                  "inverse-on-surface": "#283044",
                  "surface": "#0b1326"
                },
                "borderRadius": {
                  "DEFAULT": "0.125rem",
                  "lg": "0.25rem",
                  "xl": "0.5rem",
                  "full": "0.75rem"
                },
                "fontFamily": {
                  "headline": ["Noto Serif"],
                  "body": ["Manrope"],
                  "label": ["Manrope"]
                }
              },
            },
          }`}
        </script>
        <style>
          {`.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
          }
          body { font-family: 'Manrope', sans-serif; }
          h1, h2, h3 { font-family: 'Noto Serif', serif; }
          .glass-panel {
            background: rgba(11, 19, 38, 0.6);
            backdrop-filter: blur(24px);
          }
          .ghost-border {
            border: 1px solid rgba(233, 193, 118, 0.15);
          }`}
        </style>
      </Head>

      <div className="bg-background text-on-surface min-h-screen">
        {/* TopNavBar (Shared Component) */}
        <nav className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <div className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <div className="text-2xl font-serif tracking-widest text-[#e9c176]">FLYOXRA</div>
            <div className="hidden md:flex items-center gap-10">
              <a className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500" href="#">Home</a>
              <a className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500" href="#">Jets</a>
              <a className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500" href="#">Yachts</a>
              <a className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500" href="#">Concierge</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#e9c176]" style={{fontVariationSettings: "'FILL' 0"}}>account_circle</span>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Breadcrumb / Header */}
          <div className="mb-12">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2 block">Checkout Journey</span>
            <h1 className="text-4xl md:text-5xl font-headline italic text-on-surface">Confirm Your Voyage</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Trip Summary */}
            <aside className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <div className="bg-surface-container-low rounded-xl overflow-hidden ghost-border shadow-2xl shadow-black/40">
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt="Air Ambulance Interior"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    src="https://images.unsplash.com/photo-1540962351504-b8176673346d?w=800&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-label tracking-widest text-primary border border-primary/20 uppercase mb-2 inline-block">
                      {vehicle?.model || "Air Ambulance"}
                    </span>
                    <h3 className="text-2xl font-headline text-on-surface">
                      {vehicle?.current_location || "Medical Transport"}
                    </h3>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  {/* Itinerary Details */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Departure</p>
                      <p className="font-body text-on-surface font-semibold">Oct 24, 2024</p>
                      <p className="font-body text-sm text-on-surface-variant">14:30 GMT</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Return</p>
                      <p className="font-body text-on-surface font-semibold">Oct 28, 2024</p>
                      <p className="font-body text-sm text-on-surface-variant">10:00 CET</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Passengers</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">person</span>
                        <p className="font-body text-on-surface font-semibold">{vehicle?.passenger_capacity || "6"} Patients</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Service Level</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
                        <p className="font-body text-on-surface font-semibold">{vehicle?.cabinClass || "ICU Equipped"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="pt-8 border-t border-outline-variant space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-on-surface-variant">Medical Transport Charter</span>
                      <span className="font-body font-semibold text-on-surface">{fmt(basePrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-body text-on-surface-variant">Medical Equipment & Concierge</span>
                      <span className="font-body font-semibold text-on-surface">{fmt(cateringFee)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-body text-on-surface-variant">Airport & Medical Fees</span>
                      <span className="font-body font-semibold text-on-surface">{fmt(airportFees)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="font-headline text-xl text-primary italic">Total Amount</span>
                      <div className="text-right">
                        <span className="block font-headline text-3xl text-on-surface">{fmt(totalAmount)}</span>
                        <span className="text-[9px] font-label uppercase tracking-tighter text-on-surface-variant">Tax inclusive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-high/50 p-6 rounded-lg ghost-border flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                <div>
                  <h4 className="font-body font-bold text-sm text-on-surface">Safe Skies Guarantee</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">Your medical transport is protected by our global security network and comprehensive insurance policy.</p>
                </div>
              </div>
            </aside>

            {/* Right Column: Forms */}
            <section className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              {/* Personal Information */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-label text-xs text-primary border border-primary/20">01</span>
                    <h2 className="text-2xl font-headline">Personal Atelier Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Full Legal Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-3 font-body text-on-surface placeholder:text-surface-variant"
                        placeholder="Julian Sterling"
                        type="text"
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Email Address</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-3 font-body text-on-surface placeholder:text-surface-variant"
                        placeholder="sterling@private.com"
                        type="email"
                        required
                      />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Mobile Number</label>
                      <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-all">
                        <span className="pr-3 text-on-surface-variant font-body">+44</span>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-none focus:ring-0 py-3 font-body text-on-surface placeholder:text-surface-variant"
                          placeholder="7700 900000"
                          type="tel"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-label text-xs text-primary border border-primary/20">02</span>
                    <h2 className="text-2xl font-headline">Secure Payment Method</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer group">
                      <input
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="sr-only peer"
                        name="payment"
                        type="radio"
                      />
                      <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex items-center gap-4">
                        <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-primary" style={{fontVariationSettings: "'FILL' 1"}}>credit_card</span>
                        <div>
                          <p className="font-body font-semibold text-on-surface">Card Payment</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Visa, MC, Amex</p>
                        </div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer group">
                      <input
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="sr-only peer"
                        name="payment"
                        type="radio"
                      />
                      <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex items-center gap-4">
                        <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-primary">account_balance</span>
                        <div>
                          <p className="font-body font-semibold text-on-surface">Bank Transfer</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">SWIFT / IBAN</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* Card Details Form */}
                  {paymentMethod === "card" && (
                    <div className="bg-surface-container-low/40 p-8 rounded-xl ghost-border space-y-6">
                      <div className="group">
                        <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Cardholder Name</label>
                        <input
                          name="cardholderName"
                          value={formData.cardholderName}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface"
                          type="text"
                          required
                        />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Card Number</label>
                        <div className="flex items-center gap-3 border-b border-outline-variant focus-within:border-primary transition-all">
                          <input
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-none focus:ring-0 py-2 font-body text-on-surface placeholder:text-surface-variant"
                            placeholder="•••• •••• •••• ••••"
                            type="text"
                            required
                          />
                          <img
                            alt="Visa"
                            className="h-4 opacity-70"
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=32&h=20&fit=crop"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="group">
                          <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Expiry Date</label>
                          <input
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface placeholder:text-surface-variant text-center"
                            placeholder="MM / YY"
                            type="text"
                            required
                          />
                        </div>
                        <div className="group">
                          <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">CVV / CVC</label>
                          <input
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface placeholder:text-surface-variant text-center"
                            placeholder="•••"
                            type="password"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Final Action */}
                <div className="pt-8 space-y-6">
                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    By clicking "Complete Medical Transport Booking," you agree to FLYOXRA's <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>. A non-refundable concierge fee applies to all premium medical transport bookings.
                  </p>
                  <button
                    type="submit"
                    className="w-full py-6 rounded-md bg-gradient-to-r from-primary to-[#9d7c39] text-on-primary font-body font-extrabold uppercase tracking-[0.3em] shadow-xl shadow-primary/10 hover:tracking-[0.4em] transition-all duration-500 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Complete Medical Transport Booking
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <div className="flex items-center justify-center gap-8 pt-4">
                    <span className="flex items-center gap-2 text-[10px] font-label tracking-widest text-on-surface-variant uppercase">
                      <span className="material-symbols-outlined text-xs">lock</span> 256-bit SSL
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-label tracking-widest text-on-surface-variant uppercase">
                      <span className="material-symbols-outlined text-xs">verified</span> PCI Compliant
                    </span>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </main>

        {/* Footer Meta */}
        <footer className="py-12 border-t border-outline-variant/30">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-xl font-serif text-primary/40">FLYOXRA</div>
            <div className="flex gap-8">
              <a className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Private Atelier</a>
              <a className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Fleet Registry</a>
              <a className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Sustainability</a>
            </div>
            <div className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant/40">
              © 2024 Flyoxra Global. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}