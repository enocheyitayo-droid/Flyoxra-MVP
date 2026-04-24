import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";

export default function Checkout() {
  const router = useRouter();
  const { user, cart } = useApp() || {};
  const [bookingDetails, setBookingDetails] = useState(null);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const booking = {
      vehicleId: params.get("vehicle_id"),
      type: params.get("type") || "jets",
      from: params.get("from") || "London",
      to: params.get("to") || "Nice",
      date: params.get("date") || "Oct 24, 2024",
      time: params.get("time") || "14:30",
      passengers: params.get("passengers") || "04 Adults",
      trip: params.get("trip") || "round-trip"
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
    router.push("/confirmation");
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Checkout - FLYOXRA</title>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;600;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{__html:`tailwind.config={darkMode:"class",theme:{extend:{"colors":{"surface-tint":"#e9c176","on-tertiary-fixed":"#1c1c1a","error":"#ffb4ab","error-container":"#93000a","tertiary":"#c8c6c3","on-primary-container":"#9d7c39","surface-container-highest":"#2d3449","surface-dim":"#0b1326","primary-fixed-dim":"#e9c176","surface-container-high":"#222a3d","surface-container":"#171f33","surface-variant":"#2d3449","background":"#0b1326","on-secondary-container":"#aeb9d0","inverse-surface":"#dae2fd","secondary-container":"#3e495d","on-surface-variant":"#c6c6cd","primary":"#e9c176","on-tertiary-fixed-variant":"#474745","on-secondary-fixed-variant":"#3c475a","surface-container-lowest":"#060e20","tertiary-fixed-dim":"#c8c6c3","outline-variant":"#45464d","primary-container":"#211500","on-primary":"#412d00","on-tertiary":"#31302f","secondary":"#bcc7de","on-surface":"#dae2fd","inverse-primary":"#775a19","on-error-container":"#ffdad6","on-secondary-fixed":"#111c2d","outline":"#909097","tertiary-container":"#181816","secondary-fixed-dim":"#bcc7de","on-error":"#690005","secondary-fixed":"#d8e3fb","on-background":"#dae2fd","on-tertiary-container":"#82817e","primary-fixed":"#ffdea5","surface-bright":"#31394d","on-primary-fixed-variant":"#5d4201","tertiary-fixed":"#e5e2df","on-secondary":"#263143","on-primary-fixed":"#261900","surface-container-low":"#131b2e","inverse-on-surface":"#283044","surface":"#0b1326"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"fontFamily":{"headline":["Noto Serif"],"body":["Manrope"],"label":["Manrope"]}}}}` }} />
        <style dangerouslySetInnerHTML={{__html:`.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 24}.ghost-border{border:1px solid rgba(233,193,118,0.15)}.serif-italic{font-family:'Noto Serif',serif;font-style:italic}body{font-family:'Manrope',sans-serif}h1,h2,h3{font-family:'Noto Serif',serif}` }} />
      </Head>

      <div className="bg-background text-on-surface min-h-screen">
        {/* NavBar */}
        <nav className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <div className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <Link href="/" className="text-2xl font-serif tracking-widest text-primary">FLYOXRA</Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-primary transition-all duration-500">Home</Link>
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-primary transition-all duration-500">Jets</Link>
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-primary transition-all duration-500">Yachts</Link>
              <Link href="/" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-primary transition-all duration-500">Concierge</Link>
            </div>
            <span className="material-symbols-outlined text-primary cursor-pointer">account_circle</span>
          </div>
        </nav>

        <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2 block">Checkout Journey</span>
            <h1 className="text-4xl md:text-5xl font-serif italic text-on-surface">Confirm Your Voyage</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Trip Summary */}
            <aside className="lg:col-span-5 space-y-8 order-2 lg:order-1">
              <div className="bg-surface-container-low rounded-xl overflow-hidden ghost-border shadow-2xl shadow-black/40">
                <div className="relative h-64 overflow-hidden">
                  <img alt="Luxury Transport" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" src="https://images.unsplash.com/photo-1540962351504-b8176673346d?w=800&q=80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-label tracking-widest text-primary border border-primary/20 uppercase mb-2 inline-block">Premium Charter</span>
                    <h3 className="text-2xl font-serif italic text-on-surface">{bookingDetails?.from} — {bookingDetails?.to}</h3>
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  {/* Details */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Departure</p>
                      <p className="font-body text-on-surface font-semibold">{bookingDetails?.date}</p>
                      <p className="font-body text-sm text-on-surface-variant">{bookingDetails?.time}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Trip Type</p>
                      <p className="font-body text-on-surface font-semibold capitalize">{bookingDetails?.trip}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Passengers</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">person</span>
                        <p className="font-body text-on-surface font-semibold">{bookingDetails?.passengers}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-1">Service Level</p>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">workspace_premium</span>
                        <p className="font-body text-on-surface font-semibold">Premium</p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="pt-8 border-t border-outline-variant space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-on-surface-variant">Aircraft Charter</span>
                      <span className="font-body font-semibold text-on-surface">€34,200.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-body text-on-surface-variant">Catering & Concierge</span>
                      <span className="font-body font-semibold text-on-surface">€2,850.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-body text-on-surface-variant">Airport Fees</span>
                      <span className="font-body font-semibold text-on-surface">€1,420.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="font-serif italic text-xl text-primary">Total Amount</span>
                      <div className="text-right">
                        <span className="block font-serif text-3xl text-on-surface">€38,470.00</span>
                        <span className="text-[9px] font-label uppercase tracking-tighter text-on-surface-variant">Tax inclusive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-surface-container-high/50 p-6 rounded-lg ghost-border flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                <div>
                  <h4 className="font-body font-bold text-sm text-on-surface">Safe Skies Guarantee</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-1">Your booking is protected by our global security network and comprehensive insurance policy.</p>
                </div>
              </div>
            </aside>

            {/* Right: Forms */}
            <section className="lg:col-span-7 space-y-10 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-label text-xs text-primary border border-primary/20">01</span>
                    <h2 className="text-2xl font-serif">Personal Atelier Details</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="group">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Full Legal Name</label>
                      <input name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Julian Sterling" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-3 font-body text-on-surface placeholder:text-surface-variant" type="text" required />
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Email Address</label>
                      <input name="email" value={formData.email} onChange={handleInputChange} placeholder="sterling@private.com" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-3 font-body text-on-surface placeholder:text-surface-variant" type="email" required />
                    </div>
                    <div className="group md:col-span-2">
                      <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Mobile Number</label>
                      <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-all">
                        <span className="pr-3 text-on-surface-variant font-body">+44</span>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="7700 900000" className="w-full bg-transparent border-none focus:ring-0 py-3 font-body text-on-surface placeholder:text-surface-variant" type="tel" required />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-label text-xs text-primary border border-primary/20">02</span>
                    <h2 className="text-2xl font-serif">Secure Payment Method</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="relative cursor-pointer group">
                      <input checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="sr-only peer" name="payment" type="radio" />
                      <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex items-center gap-4">
                        <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-primary" style={{fontVariationSettings: "'FILL' 1"}}>credit_card</span>
                        <div>
                          <p className="font-body font-semibold text-on-surface">Card Payment</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Visa, MC, Amex</p>
                        </div>
                      </div>
                    </label>
                    <label className="relative cursor-pointer group">
                      <input checked={paymentMethod === "wire"} onChange={() => setPaymentMethod("wire")} className="sr-only peer" name="payment" type="radio" />
                      <div className="p-6 rounded-xl border border-outline-variant bg-surface-container-low peer-checked:border-primary peer-checked:bg-primary/5 transition-all flex items-center gap-4">
                        <span className="material-symbols-outlined text-on-surface-variant peer-checked:text-primary">account_balance</span>
                        <div>
                          <p className="font-body font-semibold text-on-surface">Bank Transfer</p>
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">SWIFT / IBAN</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="bg-surface-container-low/40 p-8 rounded-xl ghost-border space-y-6">
                      <div className="group">
                        <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Cardholder Name</label>
                        <input name="cardholderName" value={formData.cardholderName} onChange={handleInputChange} className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface" type="text" required />
                      </div>
                      <div className="group">
                        <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Card Number</label>
                        <div className="flex items-center gap-3 border-b border-outline-variant focus-within:border-primary transition-all">
                          <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="•••• •••• •••• ••••" className="w-full bg-transparent border-none focus:ring-0 py-2 font-body text-on-surface placeholder:text-surface-variant" type="text" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <div className="group">
                          <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">Expiry Date</label>
                          <input name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM / YY" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface placeholder:text-surface-variant text-center" type="text" required />
                        </div>
                        <div className="group">
                          <label className="block text-[10px] font-label uppercase tracking-widest text-on-surface-variant mb-2 group-focus-within:text-primary transition-colors">CVV / CVC</label>
                          <input name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="•••" className="w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 transition-all py-2 font-body text-on-surface placeholder:text-surface-variant text-center" type="password" required />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wire" && (
                    <div className="bg-primary/5 p-8 rounded-xl ghost-border">
                      <h4 className="font-serif text-lg mb-4">Wire Transfer Instructions</h4>
                      <p className="text-sm text-on-surface-variant mb-6">Our concierge team will provide secure wire transfer details within 30 minutes.</p>
                      <div className="text-xs text-on-surface-variant space-y-2 font-body">
                        <p><strong>Bank:</strong> FLYOXRA Private Banking</p>
                        <p><strong>SWIFT:</strong> FLYOXRAXX</p>
                        <p><strong>Reference:</strong> Your booking confirmation</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms & Submit */}
                <div className="pt-8 space-y-6">
                  <p className="text-xs text-on-surface-variant leading-relaxed italic">
                    By clicking "Complete Charter Booking," you agree to FLYOXRA's <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                  </p>
                  <button type="submit" className="w-full py-6 rounded-md bg-gradient-to-r from-primary to-[#9d7c39] text-on-primary font-body font-extrabold uppercase tracking-[0.3em] shadow-xl shadow-primary/10 hover:tracking-[0.4em] transition-all duration-500 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      Complete Charter Booking
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

        {/* Footer */}
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
