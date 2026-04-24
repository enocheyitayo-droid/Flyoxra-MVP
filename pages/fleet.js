import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FLEET, OPERATORS } from "../lib/data";

const PRIVATE_JETS = FLEET.filter(v => v.type === "jet");

const JET_CATEGORIES = {
  light: PRIVATE_JETS.filter(v => v.passenger_capacity <= 8),
  mid: PRIVATE_JETS.filter(v => v.passenger_capacity > 8 && v.passenger_capacity <= 14),
  heavy: PRIVATE_JETS.filter(v => v.passenger_capacity > 14)
};

export default function FleetPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");
  
  const displayedJets = activeCategory === "all" ? PRIVATE_JETS : JET_CATEGORIES[activeCategory];

  const handleBooking = (jetId) => {
    router.push(`/checkout?vehicle_id=${jetId}`);
  };

  const fmt = (num) => {
    if (typeof num !== 'number') return '€0';
    return '€' + Math.round(num).toLocaleString('en-US');
  };

  return (
    <div className="bg-[#0b1326] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b1326]/95 backdrop-blur-md border-b border-[#e9c176]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-serif tracking-widest text-[#e9c176]">AERIS</div>
          </Link>
          <div className="flex gap-8">
            <Link href="/fleet" className="text-[#e9c176] font-serif italic text-sm">Fleet</Link>
            <Link href="/" className="text-gray-400 hover:text-[#e9c176] text-sm transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-6 bg-gradient-to-b from-[#1a2747] to-[#0b1326]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#e9c176] text-sm tracking-widest uppercase mb-4">Curated Selection</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 font-serif">
            The Global <i className="text-[#e9c176] not-italic font-serif">Reserve</i>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl font-light">
            A bespoke collection of ultra-long-range heavy jets, prepared for immediate deployment to your desired coordinates.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex gap-8">
        {/* Sidebar Filter */}
        <aside className="hidden md:block w-64 py-12">
          <h3 className="text-[#e9c176] text-lg font-serif mb-6">Filter Fleet</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`block w-full text-left px-4 py-3 rounded text-sm tracking-wide transition-all ${
                activeCategory === "all"
                  ? "bg-[#e9c176]/10 text-[#e9c176] border-l-2 border-[#e9c176]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              All Aircraft
            </button>
            <button
              onClick={() => setActiveCategory("light")}
              className={`block w-full text-left px-4 py-3 rounded text-sm tracking-wide transition-all ${
                activeCategory === "light"
                  ? "bg-[#e9c176]/10 text-[#e9c176] border-l-2 border-[#e9c176]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Light Jets
            </button>
            <button
              onClick={() => setActiveCategory("mid")}
              className={`block w-full text-left px-4 py-3 rounded text-sm tracking-wide transition-all ${
                activeCategory === "mid"
                  ? "bg-[#e9c176]/10 text-[#e9c176] border-l-2 border-[#e9c176]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Midsize Jets
            </button>
            <button
              onClick={() => setActiveCategory("heavy")}
              className={`block w-full text-left px-4 py-3 rounded text-sm tracking-wide transition-all ${
                activeCategory === "heavy"
                  ? "bg-[#e9c176]/10 text-[#e9c176] border-l-2 border-[#e9c176]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Heavy Jets
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 py-12">
          {/* Category Tabs */}
          <div className="md:hidden mb-8 flex gap-3 overflow-x-auto pb-4">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                activeCategory === "all"
                  ? "bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/50"
                  : "bg-[#1a2747] text-gray-400 border border-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory("light")}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                activeCategory === "light"
                  ? "bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/50"
                  : "bg-[#1a2747] text-gray-400 border border-gray-700"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setActiveCategory("mid")}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                activeCategory === "mid"
                  ? "bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/50"
                  : "bg-[#1a2747] text-gray-400 border border-gray-700"
              }`}
            >
              Midsize
            </button>
            <button
              onClick={() => setActiveCategory("heavy")}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                activeCategory === "heavy"
                  ? "bg-[#e9c176]/20 text-[#e9c176] border border-[#e9c176]/50"
                  : "bg-[#1a2747] text-gray-400 border border-gray-700"
              }`}
            >
              Heavy
            </button>
          </div>

          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif font-light">Available Aircraft</h2>
            <p className="text-gray-500 text-sm tracking-widest uppercase">{displayedJets.length} Results</p>
          </div>

          {/* Aircraft Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {displayedJets.map((jet) => (
              <div
                key={jet.id}
                className="bg-[#1a2747] border border-[#e9c176]/20 rounded-lg overflow-hidden hover:border-[#e9c176]/50 transition-all group"
              >
                <div className="relative overflow-hidden h-48 bg-gray-900">
                  <img
                    src={jet.image_url}
                    alt={jet.model}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#0b1326]/80 backdrop-blur px-3 py-1 rounded border border-[#e9c176]/30">
                    <span className="text-[#e9c176] text-xs tracking-widest uppercase">
                      {jet.passenger_capacity <= 8 ? "Light" : jet.passenger_capacity <= 14 ? "Midsize" : "Heavy"} Jet
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif mb-1">{jet.model}</h3>
                    <p className="text-gray-500 text-xs tracking-widest uppercase">Tail No. {jet.id.toUpperCase()}</p>
                  </div>

                  <div className="flex justify-between items-end mb-6">
                    <div className="grid grid-cols-3 gap-4 flex-1">
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Capacity</p>
                        <p className="text-lg font-semibold">{jet.passenger_capacity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Speed</p>
                        <p className="text-lg font-semibold">{jet.speed || "Mach 0.85"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Range</p>
                        <p className="text-lg font-semibold">{jet.range || "7500 nm"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-serif text-[#e9c176]">{fmt(jet.price_per_hour)}</p>
                      <p className="text-gray-500 text-xs uppercase tracking-widest">/ Hour</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 px-4 py-3 border border-[#e9c176]/30 text-[#e9c176] rounded hover:bg-[#e9c176]/5 transition-colors text-sm tracking-wide uppercase">
                      Details
                    </button>
                    <button
                      onClick={() => handleBooking(jet.id)}
                      className="flex-1 px-4 py-3 bg-[#e9c176] text-[#0b1326] rounded font-semibold hover:bg-[#f5d88e] transition-colors text-sm tracking-wide uppercase"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#e9c176]/10 py-12 px-6 bg-[#0b1326]">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 AERIS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

        <header className="md:hidden fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md px-6 h-20 flex justify-between items-center border-b border-surface-container">
          <div className="text-xl font-serif tracking-[0.2em] text-primary">AERIS</div>
          <button className="text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        <div className="flex flex-1 pt-20 md:pt-0">
          <aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 pt-24 bg-slate-950 bg-slate-900/50 flex-col gap-6 p-8 border-r border-slate-800/50 z-40">
            <div className="mb-8">
              <h2 className="font-headline text-2xl text-[#e9c176] mb-2">Filter Fleet</h2>
              <p className="font-sans text-sm tracking-wide text-slate-400">Refine your selection</p>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
              <a className="flex items-center gap-4 px-4 py-3 text-[#e9c176] bg-[#e9c176]/5 rounded-none border-l-2 border-[#e9c176] font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined">air</span>
                Aircraft Size
              </a>
              <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-all duration-300 font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined">distance</span>
                Global Range
              </a>
              <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-all duration-300 font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined">groups</span>
                Passenger Capacity
              </a>
              <a className="flex items-center gap-4 px-4 py-3 text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-all duration-300 font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined">auto_awesome</span>
                Luxury Amenities
              </a>
            </nav>
            <button className="w-full py-4 bg-primary text-on-primary font-body text-sm uppercase tracking-widest font-semibold hover:bg-primary-fixed transition-colors duration-500 rounded-md mt-8">
              Apply Filters
            </button>
            <div className="mt-auto flex flex-col gap-2 pt-8 border-t border-slate-800/50">
              <a className="flex items-center gap-4 px-4 py-2 text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-all duration-300 font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined text-lg">support_agent</span>
                Support
              </a>
              <a className="flex items-center gap-4 px-4 py-2 text-slate-500 hover:text-slate-200 hover:bg-slate-900/80 transition-all duration-300 font-sans text-sm tracking-wide ease-in-out" href="#">
                <span className="material-symbols-outlined text-lg">settings</span>
                Settings
              </a>
            </div>
          </aside>

          <main className="flex-1 md:ml-72 relative min-h-screen">
            <section className="relative h-[614px] min-h-[500px] w-full flex items-end pb-24 px-8 md:px-16 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img alt="Sleek private jet flying above clouds during golden hour" className="w-full h-full object-cover opacity-60 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALZPvIavwdRr0hEeq9broPoZ0mbnhjM15T6t2eE5cvqOtoVwKHnh-TXC18pAc6qpHxUKGVa5wyu8eiRdFEN1ep3FNasM-bV2-mD4h7zYh1sExdz1ZSyRqpZvbAYcp8hbXSknJl7crH6tojRowR1IjA37qzM5NqFSl0xoWpkmlAardjcW6SWyNhdnAbUXNAIkYwSc5_Z03YKhVRfb5Z0sijo2Rhzh5f75SMDu_tfINVm1Lb8Fyor6355ulP-rBHiUnl__AVgDEXxWi_" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent"></div>
              </div>
              <div className="relative z-10 max-w-4xl">
                <p className="font-body text-primary text-sm tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary/50 block"></span>
                  Curated Selection
                </p>
                <h1 className="font-headline text-5xl md:text-7xl font-light leading-tight mb-8">
                  The Global <br />
                  <i className="text-primary font-serif">Reserve</i>
                </h1>
                <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                  A bespoke collection of ultra-long-range heavy jets, prepared for immediate deployment to your desired coordinates.
                </p>
              </div>
            </section>

            <div className="sticky top-20 md:top-[80px] z-30 px-8 md:px-16 py-6 bg-background/90 backdrop-blur-xl border-b border-surface-container-low/50 flex gap-4 overflow-x-auto no-scrollbar md:hidden">
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-primary/10 text-primary font-body text-sm border border-primary/20">All Categories</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-high text-on-surface font-body text-sm border border-primary/20">Light Jets</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-high text-on-surface font-body text-sm border border-primary/20">Midsize Jets</button>
              <button className="whitespace-nowrap px-6 py-2 rounded-full bg-surface-container-high text-on-surface font-body text-sm border border-primary/20">Heavy Jets</button>
            </div>

            <section className="px-8 md:px-16 pb-32 pt-12">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-headline text-3xl font-light">Available Aircraft</h2>
                <p className="font-body text-sm text-on-surface-variant tracking-widest uppercase">4 Results Found</p>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16">
                <article className="group flex flex-col bg-surface-container-lowest ghost-border rounded-lg overflow-hidden relative">
                  <div className="aspect-[16/9] w-full relative overflow-hidden ghost-glow">
                    <img alt="Bombardier Global 7500 exterior on tarmac at dusk" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ease-luxury mix-blend-luminosity hover:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmnasQVek7yEG08t2t7GdpHKi0j0Jhr8QixFfbHnyHbF5FvB7UPc3M2KTUJdwdbMO6f3yMLYLdGQY5w-Dn6EewuECDtqkO_jSdjgvv8khBhnNT6-ZfX3Od0bQXZEdcNbTBcZ-H-wfCben6KnhmjiGSeSzU5gZwFAMdbkSQf2p5tp0JOTZmY1sMQe8FPSi1GYxZ2kHhAFypKUsgjGafkrd1ILC36kjz0zU9I8R7CtSKSRSh36SHhfCnk9EIzH7QxGR50Z1DX55xIV5F" />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded ghost-border">
                      <span className="font-body text-xs tracking-widest uppercase text-primary">Heavy Jet</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-headline text-3xl mb-2">Bombardier Global 7500</h3>
                        <p className="font-body text-sm text-on-surface-variant tracking-[0.1em] uppercase">Tail No. N-750X</p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline text-2xl text-primary">€15,800</p>
                        <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest">/ Hour</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-surface-container-low">
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">groups</span>
                        <span className="font-body text-sm font-semibold">19 Guests</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Capacity</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">speed</span>
                        <span className="font-body text-sm font-semibold">Mach 0.925</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Top Speed</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">public</span>
                        <span className="font-body text-sm font-semibold">7,700 nm</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Max Range</span>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center gap-6">
                      <button className="flex-1 py-4 bg-transparent border border-primary/20 text-primary font-body text-sm uppercase tracking-widest hover:bg-primary/5 transition-colors duration-300 rounded-md">
                        View Details
                      </button>
                      <button className="flex-1 py-4 bg-gradient-to-r from-primary to-on-primary-container text-on-primary font-body text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity duration-300 rounded-md shadow-[0_0_30px_rgba(233,193,118,0.2)]">
                        Book Voyage
                      </button>
                    </div>
                  </div>
                </article>
                <article className="group flex flex-col bg-surface-container-lowest ghost-border rounded-lg overflow-hidden relative">
                  <div className="aspect-[16/9] w-full relative overflow-hidden ghost-glow">
                    <img alt="Gulfstream G650 parked in luxury hangar" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ease-luxury mix-blend-luminosity hover:mix-blend-normal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0FkZbVMNgPn4r7JrUd0hutlkHU50f-fxwDe1yTl8uPn7jNEAsPfviz2eo35zrRlH9peV1C4j5OFZ02pZ_jOcC1hrHml6giXfd5Ou28w4ITBqLU_mbFUy7we7CI_K2XvtApKbO-sB9IT38dT5UHxa15RJuLbJVveZEgwrgnPEKBN7PxfzjNmJi0XzRGHmjGfb7NY9H4Cwc9uLAmbAn5HDFLbcMT1GxcmkwdmvkGaIxneLuF-LdPJeIIVG_4629PGxaux4v9rqpVdTE" />
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded ghost-border">
                      <span className="font-body text-xs tracking-widest uppercase text-primary">Heavy Jet</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-headline text-3xl mb-2">Gulfstream G650ER</h3>
                        <p className="font-body text-sm text-on-surface-variant tracking-[0.1em] uppercase">Tail No. N-650G</p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline text-2xl text-primary">€14,500</p>
                        <p className="font-body text-xs text-on-surface-variant uppercase tracking-widest">/ Hour</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mb-10 py-6 border-y border-surface-container-low">
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">groups</span>
                        <span className="font-body text-sm font-semibold">16 Guests</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Capacity</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">speed</span>
                        <span className="font-body text-sm font-semibold">Mach 0.90</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Top Speed</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="material-symbols-outlined text-primary/70 font-light mb-1">public</span>
                        <span className="font-body text-sm font-semibold">7,500 nm</span>
                        <span className="font-body text-xs text-on-surface-variant uppercase tracking-wide">Max Range</span>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center gap-6">
                      <button className="flex-1 py-4 bg-transparent border border-primary/20 text-primary font-body text-sm uppercase tracking-widest hover:bg-primary/5 transition-colors duration-300 rounded-md">
                        View Details
                      </button>
                      <button className="flex-1 py-4 bg-gradient-to-r from-primary to-on-primary-container text-on-primary font-body text-sm uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity duration-300 rounded-md shadow-[0_0_30px_rgba(233,193,118,0.2)]">
                        Book Voyage
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section className="py-32 bg-surface-container-lowest">
              <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                  <div className="relative">
                    <img className="w-full h-[500px] object-cover rounded-lg shadow-2xl shadow-black/40" alt="luxury superyacht anchored in crystal clear turquoise water of the Mediterranean at sunset, elegant deck lighting glowing" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8nO1oLj4h3q4OU8asgV1Mg92Wj4c42-YtPt_Muh2Qs8CpzXlTAC48XBTHEff-rHNYX1VRtEi83SXS_jUWZqb9loeX9uYU082y8ig3GnIPdRQW2-RNqGj73WrN1r8_Mxhvqxgrh1Xwt0kARpn9Tp6dOBq4fwGh__c7AvqYGMTwJzat8mlc39cJ7Y_i5ef1H7f4J7d5S1dk9MRN_kt8LfoN1iv2L7Ddfp3LKeDfpblM1GQK7W2j4xYVYIGBHHMzV7bsQu_4Ny6efCOU" />
                    <div className="absolute -bottom-8 -right-8 bg-zinc-950 p-8 border border-white/10 hidden md:block">
                      <p className="font-serif italic text-primary text-2xl">
                        "The sea, once it casts its spell, holds one in its net of wonder forever."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                  <span className="font-label text-[10px] tracking-[0.4em] uppercase text-primary">Maritime Atelier</span>
                  <h2 className="text-4xl md:text-6xl font-serif leading-tight">Yacht Charter Reimagined.</h2>
                  <p className="text-zinc-400 text-lg leading-relaxed font-light">
                    From the Amalfi Coast to the archipelagos of Southeast Asia, our yacht division offers exclusive access to the world's most prestigious vessels and hidden coves.
                  </p>
                  <div className="pt-6">
                    <Link href="/yachts" className="px-10 py-4 border border-primary/20 text-primary font-label uppercase text-[10px] tracking-[0.3em] hover:bg-primary/5 transition-all">
                      Explore the Fleet
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
