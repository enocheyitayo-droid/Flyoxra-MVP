// pages/index.js — Home page
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";
import AirportSearch from "../components/AirportSearch";
import LocationSearch from "../components/LocationSearch";

export default function Home() {
  const router = useRouter();
  const { user } = useApp() || {};
  const [activeTab, setActiveTab] = useState("jets");
  const [tripType, setTripType] = useState("one-way");
  const [f, setF] = useState({
    fromObj: null,   // { label, iata, icao, city, country, iso, lat, lon }
    toObj: null,     // { label, iata, icao, city, country, iso, lat, lon }
    locObj: null,    // { label, marina, country, iso, region, type } for yachts
    date: "",
    time: "",
    passengers: "1 Passenger"
  });
  const set = (k, v) => setF(p => ({ ...p, [k]: v }));

  const typeMap = {
    jets: "jet",
    helicopters: "helicopter",
    ambulance: "ambulance",
    yachts: "yacht"
  };

  const extractPassengers = (paxString) => {
    // Extract number from "5-8 Passengers" or similar
    const match = paxString.match(/^\d+/);
    return match ? match[0] : "1";
  };

  const go = () => {
    // Flatten object data to strings + coordinates for API and search
    const from = f.fromObj?.label || f.locObj?.label || "";
    const to = f.toObj?.label || f.locObj?.country || "";
    const fromLat = f.fromObj?.lat || f.locObj?.lat;
    const fromLon = f.fromObj?.lon || f.locObj?.lon;
    const toLat = f.toObj?.lat;
    const toLon = f.toObj?.lon;

    const q = new URLSearchParams({
      type: typeMap[activeTab] || activeTab,
      trip: tripType,
      passengers: extractPassengers(f.passengers),
      from,
      to,
      ...(fromLat && { fromLat }),
      ...(fromLon && { fromLon }),
      ...(toLat && { toLat }),
      ...(toLon && { toLon }),
      date: f.date,
      time: f.time
    });
    router.push(`/results?${q}`);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
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

      <div className="bg-background text-on-surface selection:bg-primary/30">
        {/* TopNavBar */}
        <header className="fixed top-0 w-full z-50 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl shadow-black/20">
          <nav className="flex justify-between items-center px-6 md:px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <div className="text-2xl font-serif tracking-widest text-[#e9c176]">FLYOXRA</div>
            <div className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-[#e9c176] font-serif italic border-b border-[#e9c176]/30 hover:tracking-widest transition-all duration-500">
                Home
              </Link>
              <Link href="/fleet" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Jets
              </Link>
              <Link href="/yachts" className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
                Yachts
              </Link>
              <Link href="/concierge " className="text-zinc-400 font-sans uppercase tracking-widest text-[11px] hover:text-[#e9c176] hover:tracking-widest transition-all duration-500">
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

        <main>
          {/* Cinematic Hero Section */}
          <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <video
                className="w-full h-full object-cover brightness-[0.4]"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
            </div>
            <div className="relative z-10 w-full max-w-6xl px-6 pt-20">
              <div className="text-center mb-12">
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary/80 mb-4 block">
                  The Pinnacle of Private Aviation
                </span>
                <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
                  Define Your Horizon.
                </h1>
              </div>

              {/* Booking Form Container */}
              <div className="bg-zinc-950/40 glass-panel p-1 rounded-xl shadow-2xl border border-white/5 max-w-4xl mx-auto">
                {/* Tabs */}
                <div className="flex border-b border-white/5">
                  <button
                    onClick={() => setActiveTab("jets")}
                    className={`flex-1 py-4 text-[11px] font-sans uppercase tracking-widest transition-all ${
                      activeTab === "jets"
                        ? "text-[#e9c176] border-b border-[#e9c176]"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    Jets
                  </button>
                  <button
                    onClick={() => setActiveTab("helicopters")}
                    className={`flex-1 py-4 text-[11px] font-sans uppercase tracking-widest transition-all ${
                      activeTab === "helicopters"
                        ? "text-[#e9c176] border-b border-[#e9c176]"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    Helicopters
                  </button>
                  <button
                    onClick={() => setActiveTab("ambulance")}
                    className={`flex-1 py-4 text-[11px] font-sans uppercase tracking-widest transition-all ${
                      activeTab === "ambulance"
                        ? "text-[#e9c176] border-b border-[#e9c176]"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    Air Ambulance
                  </button>
                  <button
                    onClick={() => setActiveTab("yachts")}
                    className={`flex-1 py-4 text-[11px] font-sans uppercase tracking-widest transition-all ${
                      activeTab === "yachts"
                        ? "text-[#e9c176] border-b border-[#e9c176]"
                        : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    Yachts
                  </button>
                </div>

                {/* Form Content - Dynamic based on active tab */}
                <div className="p-8 space-y-8">
                  {activeTab === "yachts" ? (
                    <>
                      {/* Yacht Form Content */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <LocationSearch
                          label="Location / Marina"
                          placeholder="Maldives, Monaco, Bora Bora, Porto Montenegro…"
                          value={f.locObj}
                          onChange={(v) => setF(p => ({ ...p, locObj: v }))}
                          error={false}
                        />
                      </div>

                      {/* Meta Grid for Yachts */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="relative group col-span-1 md:col-span-1">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Date
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">calendar_month</span>
                            <input
                              className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-zinc-700"
                              placeholder="Select Date"
                              type="date"
                              value={f.date}
                              onChange={e => set("date", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Time
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">schedule</span>
                            <input
                              className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-zinc-700"
                              placeholder="Departure Time"
                              type="time"
                              value={f.time}
                              onChange={e => set("time", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Guests
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">group</span>
                            <select
                              className="bg-transparent border-none focus:ring-0 w-full text-sm text-zinc-300"
                              value={f.passengers}
                              onChange={e => set("passengers", e.target.value)}
                            >
                              <option>1-2 Guests</option>
                              <option>3-6 Guests</option>
                              <option>7-12 Guests</option>
                              <option>13+ Guests</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={go}
                            className="w-full bg-primary hover:bg-on-primary-container text-on-primary py-3 rounded-sm font-label uppercase text-[11px] tracking-[0.2em] font-bold transition-all duration-500 hover:tracking-[0.3em]"
                          >
                            Explore Yacht Fleet
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Aviation Form Content (Jets, Helicopters, Air Ambulance) */}
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            checked={tripType === "one-way"}
                            onChange={() => setTripType("one-way")}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                            name="trip"
                            type="radio"
                          />
                          <span className="text-[11px] uppercase tracking-widest text-zinc-300 group-hover:text-primary transition-colors">
                            One-way
                          </span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            checked={tripType === "round-trip"}
                            onChange={() => setTripType("round-trip")}
                            className="form-radio bg-transparent border-primary/40 text-primary focus:ring-0"
                            name="trip"
                            type="radio"
                          />
                          <span className="text-[11px] uppercase tracking-widest text-zinc-300 group-hover:text-primary transition-colors">
                            Round-trip
                          </span>
                        </label>
                      </div>

                      {/* Search Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AirportSearch
                          label={activeTab === "ambulance" ? "Pickup Location" : "Departure Airport / City"}
                          placeholder={activeTab === "ambulance" ? "Hospital/Location" : "Lagos, LOS, London Heathrow…"}
                          value={f.fromObj}
                          onChange={(v) => setF(p => ({ ...p, fromObj: v }))}
                          error={false}
                        />
                        <AirportSearch
                          label={activeTab === "ambulance" ? "Destination" : "Arrival Airport / City"}
                          placeholder={activeTab === "ambulance" ? "Hospital/Location" : "Dubai, DXB, New York JFK…"}
                          value={f.toObj}
                          onChange={(v) => setF(p => ({ ...p, toObj: v }))}
                          error={false}
                        />
                      </div>

                      {/* Meta Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="relative group col-span-1 md:col-span-1">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Date
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">calendar_month</span>
                            <input
                              className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-zinc-700"
                              placeholder="Select Date"
                              type="date"
                              value={f.date}
                              onChange={e => set("date", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Time
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">schedule</span>
                            <input
                              className="bg-transparent border-none focus:ring-0 w-full text-sm placeholder:text-zinc-700"
                              placeholder="Departure Time"
                              type="time"
                              value={f.time}
                              onChange={e => set("time", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="relative group">
                          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                            Passengers
                          </label>
                          <div className="flex items-center border-b border-outline-variant group-focus-within:border-primary transition-colors py-2">
                            <span className="material-symbols-outlined text-primary/60 mr-3">group</span>
                            <select
                              className="bg-transparent border-none focus:ring-0 w-full text-sm text-zinc-300"
                              value={f.passengers}
                              onChange={e => set("passengers", e.target.value)}
                            >
                              <option>1 Passenger</option>
                              <option>2-4 Passengers</option>
                              <option>5-8 Passengers</option>
                              <option>9+ Passengers</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-end">
                          <button
                            onClick={go}
                            className="w-full bg-primary hover:bg-on-primary-container text-on-primary py-3 rounded-sm font-label uppercase text-[11px] tracking-[0.2em] font-bold transition-all duration-500 hover:tracking-[0.3em]"
                          >
                            {activeTab === "ambulance" ? "Request Service" : "Search Fleet"}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Feature Bento Grid */}
          <section className="py-32 px-6 md:px-12 bg-background max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
              <div className="md:col-span-8 relative group overflow-hidden rounded-lg bg-surface-container-low">
                <img
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                  alt="ultra-luxurious private jet interior with cream leather seating, soft ambient golden lighting, and a bottle of vintage champagne on a polished wood table"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaIfIsclu318GR_oF1WRVFPSYnhBbGIBJ_1WasujvbE4B7r999tS4oJFNXDXIwi82XmYh90OFCFr88tUoJgqf5Lu0P3MQmkoOc7oHXNfleLpCtzfy7jnYofonYeaOPgB5osewDld4xMsDrrpSLfp_opw2_8BI1P7skbblmGmYGslsjaanAT5zHAQHkzy_Lcli2GgwdgJ0vP6kdYExjsNfWa92nfZU_Js7AH1IX4ygqjWvoxTIiNkfsPPAwZ26acGfN6dKuOhF2L_aG"
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-background via-transparent to-transparent">
                  <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary mb-2">
                    Curation
                  </span>
                  <h3 className="text-3xl font-serif mb-4">The Bespoke Experience</h3>
                  <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                    Every flight is a tailored masterpiece, curated by our personal concierge team to exceed the expectations of the modern pioneer.
                  </p>
                </div>
              </div>
              <div className="md:col-span-4 grid grid-rows-2 gap-6">
                <div className="bg-surface-container p-10 flex flex-col justify-center border border-white/5 rounded-lg">
                  <span className="material-symbols-outlined text-primary mb-6 text-4xl">diamond</span>
                  <h4 className="font-serif text-xl mb-2">Unrivaled Privacy</h4>
                  <p className="text-zinc-500 text-sm">
                    Discretion is our cornerstone. Travel anonymously through our network of private terminals.
                  </p>
                </div>
                <div className="bg-primary/5 p-10 flex flex-col justify-center border border-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary mb-6 text-4xl">public</span>
                  <h4 className="font-serif text-xl mb-2">Global Reach</h4>
                  <p className="text-zinc-500 text-sm">
                    Direct access to over 5,000 airports worldwide, from major hubs to remote retreats.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Yacht Experience Section */}
          <section className="py-32 bg-surface-container-lowest">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <img
                    className="w-full h-[500px] object-cover rounded-lg shadow-2xl shadow-black/40"
                    alt="luxury superyacht anchored in crystal clear turquoise water of the Mediterranean at sunset, elegant deck lighting glowing"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8nO1oLj4h3q4OU8asgV1Mg92Wj4c42-YtPt_Muh2Qs8CpzXlTAC48XBTHEff-rHNYX1VRtEi83SXS_jUWZqb9loeX9uYU082y8ig3GnIPdRQW2-RNqGj73WrN1r8_Mxhvqxgrh1Xwt0kARpn9Tp6dOBq4fwGh__c7AvqYGMTwJzat8mlc39cJ7Y_i5ef1H7f4J7d5S1dk9MRN_kt8LfoN1iv2L7Ddfp3KKeDfpblM1GQK7W2j4xYVYIGBHHMzV7bsQu_4Ny6efCOU"
                  />
                  <div className="absolute -bottom-8 -right-8 bg-zinc-950 p-8 border border-white/10 hidden md:block">
                    <p className="font-serif italic text-primary text-2xl">
                      "The sea, once it casts its spell, holds one in its net of wonder forever."
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-8">
                <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary">
                  Maritime Atelier
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                  Yacht Charter Reimagined.
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  From the Amalfi Coast to the archipelagos of Southeast Asia, our yacht division offers exclusive access to the world's most prestigious vessels and hidden coves.
                </p>
                <div className="pt-6">
                  <Link
                    href="/yachts"
                    className="px-10 py-4 border border-primary/20 text-primary font-label uppercase text-[10px] tracking-[0.3em] hover:bg-primary/5 transition-all"
                  >
                    Explore the Fleet
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer: Quiet Luxury */}
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
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">
                  Fleet
                </h5>
                <ul className="space-y-4">
                  <li>
                    <Link href="/fleet" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Private Jets
                    </Link>
                  </li>
                  <li>
                    <Link href="/helicopters" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Helicopters
                    </Link>
                  </li>
                  <li>
                    <Link href="/checkout?vehicle_id=v9" className="text-zinc-500 text-xs hover:text-primary transition-colors">
                      Air Ambulance
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
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">
                  Services
                </h5>
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
                <h5 className="font-label text-[10px] tracking-[0.3em] uppercase text-zinc-300 mb-8">
                  Headquarters
                </h5>
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
                © 2025 FLYOXRA. All rights reserved.
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

        {/* FAB: Concierge */}
        <div className="fixed bottom-8 right-8 z-40">
          <Link
            href="/concierge"
            className="bg-[#e9c176] text-on-primary p-4 rounded-full shadow-2xl shadow-primary/20 flex items-center justify-center group transition-all hover:scale-110"
          >
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 group-hover:ml-3 font-label text-[10px] uppercase tracking-widest whitespace-nowrap">
              Concierge
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
