// pages/checkout.js — Checkout page
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";

export default function Checkout() {
  const router = useRouter();
  const { user } = useApp() || {};
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    specialRequests: ""
  });

  useEffect(() => {
    // Get booking details from URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    const booking = {
      type: params.get("type") || "jets",
      from: params.get("from") || "",
      to: params.get("to") || "",
      date: params.get("date") || "",
      time: params.get("time") || "",
      passengers: params.get("passengers") || "1 Passenger",
      trip: params.get("trip") || "one-way"
    };
    setBookingDetails(booking);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert("Payment processed successfully! Redirecting to confirmation...");
    router.push("/confirmation");
  };

  const calculateTotal = () => {
    // Mock pricing calculation
    const basePrice = bookingDetails?.type === "jets" ? 25000 :
                     bookingDetails?.type === "helicopters" ? 15000 :
                     bookingDetails?.type === "ambulance" ? 35000 : 50000;
    return basePrice.toLocaleString();
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Checkout - FLYOXRA</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@300;400;500;600;800&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
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
                    }
                }
            }
        `}}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { font-family: 'Manrope', sans-serif; }
            h1, h2, h3, .font-serif { font-family: 'Noto Serif', serif; }
            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            .glass-panel { backdrop-filter: blur(24px); }
            .no-scrollbar::-webkit-scrollbar { display: none; }
        `}}
        />
      </Head>

      <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen">
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <nav className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <Link href="/" className="text-2xl font-serif tracking-widest text-[#e9c176]">
              FLYOXRA
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Home
              </Link>
              <Link href="/fleet" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Jets
              </Link>
              <Link href="/yachts" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Yachts
              </Link>
              <Link href="/concierge" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Concierge
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href={user ? "/dashboard" : "/auth/login"} className="text-[#e9c176] transition-transform hover:scale-110">
                <span className="material-symbols-outlined">account_circle</span>
              </Link>
              <button className="md:hidden text-[#e9c176]">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </nav>
        </header>

        <main className="pt-24">
          {/* Checkout Header */}
          <section className="py-16 px-6 md:px-12 bg-surface-container-lowest">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-4 block">
                  Secure Checkout
                </span>
                <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                  Complete Your Reservation
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                  Review your booking details and securely complete your payment to confirm your private aviation experience.
                </p>
              </div>
            </div>
          </section>

          {/* Checkout Form */}
          <section className="py-16 px-6 md:px-12 bg-background">
            <div className="max-w-6xl mx-auto">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column - Booking Details */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Contact Information */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Payment Information</h3>

                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
                        Payment Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                          />
                          <span className="text-sm text-zinc-300">Credit Card</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="wire"
                            checked={paymentMethod === "wire"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                          />
                          <span className="text-sm text-zinc-300">Wire Transfer</span>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "wire" && (
                      <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                        <h4 className="font-serif text-lg mb-2">Wire Transfer Instructions</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                          After submitting this form, our concierge team will provide you with secure wire transfer details within 30 minutes.
                        </p>
                        <div className="text-xs text-zinc-500 space-y-1">
                          <p>Bank: FLYOXRA Private Banking</p>
                          <p>SWIFT: FLYOXRAXX</p>
                          <p>Reference: Your booking confirmation number</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Special Requests</h3>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special dietary requirements, accessibility needs, or other preferences..."
                      rows={4}
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Right Column - Booking Summary */}
                <div className="space-y-8">
                  {/* Booking Summary */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5 sticky top-32">
                    <h3 className="text-xl font-serif mb-6 text-primary">Booking Summary</h3>

                    {bookingDetails && (
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400 capitalize">{bookingDetails.type}</span>
                          <span className="text-sm text-zinc-300">{bookingDetails.trip}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Route</span>
                          <span className="text-sm text-zinc-300">
                            {bookingDetails.from} → {bookingDetails.to}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Date & Time</span>
                          <span className="text-sm text-zinc-300">
                            {bookingDetails.date} {bookingDetails.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Passengers</span>
                          <span className="text-sm text-zinc-300">{bookingDetails.passengers}</span>
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Subtotal</span>
                        <span className="text-sm text-zinc-300">${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Service Fee</span>
                        <span className="text-sm text-zinc-300">$2,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Taxes</span>
                        <span className="text-sm text-zinc-300">$1,250</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <span className="text-lg font-serif text-primary">Total</span>
                        <span className="text-lg font-serif text-primary">
                          ${(parseInt(calculateTotal().replace(/,/g, '')) + 2500 + 1250).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="mb-6">
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox bg-transparent border-primary/40 text-primary focus:ring-0 mt-1"
                          required
                        />
                        <span className="text-xs text-zinc-500 leading-relaxed">
                          I agree to the{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-on-primary-container text-on-primary py-4 rounded-sm font-label uppercase text-[11px] tracking-[0.2em] font-bold transition-all duration-500 hover:tracking-[0.3em]"
                    >
                      Complete Reservation
                    </button>

                    <p className="text-xs text-zinc-600 text-center mt-4">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-950 pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-1">
                <div className="text-2xl font-serif tracking-widest text-[#e9c176] mb-8">FLYOXRA</div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                  A private atelier dedicated to the art of seamless travel. Providing bespoke aviation and maritime solutions for the global elite.
                </p>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Fleet</h5>
                <ul className="space-y-4">
                  <li>
                    <Link href="/fleet?category=light" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Light Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/fleet?category=midsize" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Midsize Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/fleet?category=heavy" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Global Heavy Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/yachts" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Superyachts
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Services</h5>
                <ul className="space-y-4">
                  <li>
                    <Link href="/charter" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Private Charters
                    </Link>
                  </li>
                  <li>
                    <Link href="/concierge" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Concierge Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/management" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Jet Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/ambulance" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Air Ambulance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Headquarters</h5>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Mayfair, London<br />
                  Dubai International Financial Centre<br />
                  Geneva Private Terminal
                </p>
                <div className="flex space-x-6 mt-8">
                  <a className="text-zinc-500 hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">language</span>
                  </a>
                  <a className="text-zinc-500 hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4 md:mb-0">
                © 2024 FLYOXRA Private Atelier. All rights reserved.
              </span>
              <div className="flex space-x-8">
                <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/safety" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Safety
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}// pages/checkout.js — Checkout page
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";

export default function Checkout() {
  const router = useRouter();
  const { user } = useApp() || {};
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    specialRequests: ""
  });

  useEffect(() => {
    // Get booking details from URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    const booking = {
      type: params.get("type") || "jets",
      from: params.get("from") || "",
      to: params.get("to") || "",
      date: params.get("date") || "",
      time: params.get("time") || "",
      passengers: params.get("passengers") || "1 Passenger",
      trip: params.get("trip") || "one-way"
    };
    setBookingDetails(booking);
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert("Payment processed successfully! Redirecting to confirmation...");
    router.push("/confirmation");
  };

  const calculateTotal = () => {
    // Mock pricing calculation
    const basePrice = bookingDetails?.type === "jets" ? 25000 :
                     bookingDetails?.type === "helicopters" ? 15000 :
                     bookingDetails?.type === "ambulance" ? 35000 : 50000;
    return basePrice.toLocaleString();
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Checkout - FLYOXRA</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@300;400;500;600;800&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            tailwind.config = {
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
                    }
                }
            }
        `}}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body { font-family: 'Manrope', sans-serif; }
            h1, h2, h3, .font-serif { font-family: 'Noto Serif', serif; }
            .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24; }
            .glass-panel { backdrop-filter: blur(24px); }
            .no-scrollbar::-webkit-scrollbar { display: none; }
        `}}
        />
      </Head>

      <div className="bg-background text-on-surface selection:bg-primary/30 min-h-screen">
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <nav className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <Link href="/" className="text-2xl font-serif tracking-widest text-[#e9c176]">
              FLYOXRA
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Home
              </Link>
              <Link href="/fleet" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Jets
              </Link>
              <Link href="/yachts" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Yachts
              </Link>
              <Link href="/concierge" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Concierge
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link href={user ? "/dashboard" : "/auth/login"} className="text-[#e9c176] transition-transform hover:scale-110">
                <span className="material-symbols-outlined">account_circle</span>
              </Link>
              <button className="md:hidden text-[#e9c176]">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </nav>
        </header>

        <main className="pt-24">
          {/* Checkout Header */}
          <section className="py-16 px-6 md:px-12 bg-surface-container-lowest">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-4 block">
                  Secure Checkout
                </span>
                <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                  Complete Your Reservation
                </h1>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                  Review your booking details and securely complete your payment to confirm your private aviation experience.
                </p>
              </div>
            </div>
          </section>

          {/* Checkout Form */}
          <section className="py-16 px-6 md:px-12 bg-background">
            <div className="max-w-6xl mx-auto">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column - Booking Details */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Contact Information */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Payment Information</h3>

                    {/* Payment Method Selection */}
                    <div className="mb-6">
                      <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-4">
                        Payment Method
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                          />
                          <span className="text-sm text-zinc-300">Credit Card</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="wire"
                            checked={paymentMethod === "wire"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                          />
                          <span className="text-sm text-zinc-300">Wire Transfer</span>
                        </label>
                      </div>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "wire" && (
                      <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
                        <h4 className="font-serif text-lg mb-2">Wire Transfer Instructions</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                          After submitting this form, our concierge team will provide you with secure wire transfer details within 30 minutes.
                        </p>
                        <div className="text-xs text-zinc-500 space-y-1">
                          <p>Bank: FLYOXRA Private Banking</p>
                          <p>SWIFT: FLYOXRAXX</p>
                          <p>Reference: Your booking confirmation number</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5">
                    <h3 className="text-xl font-serif mb-6 text-primary">Special Requests</h3>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      placeholder="Any special dietary requirements, accessibility needs, or other preferences..."
                      rows={4}
                      className="w-full bg-surface-container-low border border-outline-variant rounded px-4 py-3 text-sm focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Right Column - Booking Summary */}
                <div className="space-y-8">
                  {/* Booking Summary */}
                  <div className="bg-surface-container p-8 rounded-lg border border-white/5 sticky top-32">
                    <h3 className="text-xl font-serif mb-6 text-primary">Booking Summary</h3>

                    {bookingDetails && (
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400 capitalize">{bookingDetails.type}</span>
                          <span className="text-sm text-zinc-300">{bookingDetails.trip}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Route</span>
                          <span className="text-sm text-zinc-300">
                            {bookingDetails.from} → {bookingDetails.to}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Date & Time</span>
                          <span className="text-sm text-zinc-300">
                            {bookingDetails.date} {bookingDetails.time}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-sm text-zinc-400">Passengers</span>
                          <span className="text-sm text-zinc-300">{bookingDetails.passengers}</span>
                        </div>
                      </div>
                    )}

                    {/* Pricing */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Subtotal</span>
                        <span className="text-sm text-zinc-300">${calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Service Fee</span>
                        <span className="text-sm text-zinc-300">$2,500</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-zinc-400">Taxes</span>
                        <span className="text-sm text-zinc-300">$1,250</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <span className="text-lg font-serif text-primary">Total</span>
                        <span className="text-lg font-serif text-primary">
                          ${(parseInt(calculateTotal().replace(/,/g, '')) + 2500 + 1250).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="mb-6">
                      <label className="flex items-start space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="form-checkbox bg-transparent border-primary/40 text-primary focus:ring-0 mt-1"
                          required
                        />
                        <span className="text-xs text-zinc-500 leading-relaxed">
                          I agree to the{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-on-primary-container text-on-primary py-4 rounded-sm font-label uppercase text-[11px] tracking-[0.2em] font-bold transition-all duration-500 hover:tracking-[0.3em]"
                    >
                      Complete Reservation
                    </button>

                    <p className="text-xs text-zinc-600 text-center mt-4">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-zinc-950 pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
              <div className="col-span-1 md:col-span-1">
                <div className="text-2xl font-serif tracking-widest text-[#e9c176] mb-8">FLYOXRA</div>
                <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                  A private atelier dedicated to the art of seamless travel. Providing bespoke aviation and maritime solutions for the global elite.
                </p>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Fleet</h5>
                <ul className="space-y-4">
                  <li>
                    <Link href="/fleet?category=light" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Light Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/fleet?category=midsize" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Midsize Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/fleet?category=heavy" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Global Heavy Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/yachts" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Superyachts
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Services</h5>
                <ul className="space-y-4">
                  <li>
                    <Link href="/charter" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Private Charters
                    </Link>
                  </li>
                  <li>
                    <Link href="/concierge" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Concierge Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/management" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Jet Management
                    </Link>
                  </li>
                  <li>
                    <Link href="/ambulance" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Air Ambulance
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">Headquarters</h5>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  Mayfair, London<br />
                  Dubai International Financial Centre<br />
                  Geneva Private Terminal
                </p>
                <div className="flex space-x-6 mt-8">
                  <a className="text-zinc-500 hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">language</span>
                  </a>
                  <a className="text-zinc-500 hover:text-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-sm">share</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4 md:mb-0">
                © 2024 FLYOXRA Private Atelier. All rights reserved.
              </span>
              <div className="flex space-x-8">
                <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Terms
                </Link>
                <Link href="/safety" className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-primary transition-colors">
                  Safety
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
