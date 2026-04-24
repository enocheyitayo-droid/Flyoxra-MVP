import Head from "next/head";
import Link from "next/link";

export default function YachtsPage() {
  return (
    <div className="bg-background text-on-background selection:bg-primary/30 min-h-screen">
      <Head>
        <title>Nocturnal Atelier | Yachts</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
          <div className="text-xl font-serif tracking-widest text-[#e9c176] uppercase">Nocturnal Atelier</div>
          <div className="hidden md:flex items-center gap-10">
            <a className="text-slate-400 hover:text-slate-100 transition-colors hover:tracking-widest duration-500 font-sans font-light tracking-tight" href="#">Charters</a>
            <a className="text-[#e9c176] font-medium border-b border-[#e9c176]/30 pb-1 font-sans tracking-tight" href="#">Destinations</a>
            <a className="text-slate-400 hover:text-slate-100 transition-colors hover:tracking-widest duration-500 font-sans font-light tracking-tight" href="#">Fleet</a>
            <a className="text-slate-400 hover:text-slate-100 transition-colors hover:tracking-widest duration-500 font-sans font-light tracking-tight" href="#">Concierge</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="material-symbols-outlined text-[#e9c176] cursor-pointer">account_circle</span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#e9c176]/20 to-transparent"></div>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-display serif-italic leading-tight text-on-background mb-4">
                The Summer <span className="text-primary">Fleet</span>
              </h1>
              <p className="text-on-surface-variant font-light tracking-wide max-w-xl">
                Curated maritime experiences across the world's most prestigious waters. Select your horizon.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest bg-primary text-on-primary shadow-lg shadow-primary/10 transition-all duration-300">
                All Horizons
              </button>
              <button className="px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface hover:bg-primary/20 transition-all duration-300">
                French Riviera
              </button>
              <button className="px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface hover:bg-primary/20 transition-all duration-300">
                Amalfi Coast
              </button>
              <button className="px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest bg-surface-container-high text-on-surface hover:bg-primary/20 transition-all duration-300">
                Greek Islands
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-low border border-primary/5">
            <div className="aspect-[16/9] w-full relative">
              <img
                alt="Luxury Yacht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj1TrLYYuC749JZDP7K74Tvv8z2Luylia9d5WFBv9aIgYEas75dOrnf4kFDZ2Y_x5knDgZxhy_f7uCsWj413h2WdUKVqK5NQDSqAoYONqcgoqnwZOmVlY8-8uU1fHPup-VC72_XPesQZ6HVHsF-YDEA5qfQ7wFC54GaAhG6OVRWm7GapBPQOgmahHH_ClAVFyTi0SRWoQrPt6MPUTOBwYVFjViCro0me0LwRFd2Z7uhS7HTFxsBfQyvyiqeoqJ4V_vhb6T6TluZXx1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            </div>
            <div className="p-8 relative -mt-20 glass-effect bg-surface-container-low/60 mx-6 mb-6 rounded-lg border border-primary/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-label tracking-[0.3em] uppercase text-primary mb-2 block">Monaco Charter</span>
                  <h2 className="text-3xl font-display serif-italic text-on-background">L'Aube Dorée</h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-body font-light text-primary tracking-tighter">€4,200 <span className="text-xs uppercase tracking-widest text-on-surface-variant">/ hr</span></div>
                  <div className="text-sm font-body font-light text-on-surface-variant italic">€850 per seat</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-primary/10 pt-6">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary/60">straighten</span>
                  <div className="text-xs uppercase tracking-widest font-light">65 Meters</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary/60">groups</span>
                  <div className="text-xs uppercase tracking-widest font-light">12 Guests</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary/60">badge</span>
                  <div className="text-xs uppercase tracking-widest font-light">18 Crew</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 group flex flex-col bg-surface-container border border-primary/5 rounded-lg overflow-hidden">
            <div className="aspect-square w-full relative">
              <img
                alt="Luxury Yacht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQFXd8awRsn0Pf5RY2Rr8YYYxADV-ky8tMdUx9iMv6WQ3cZjdbnPdIV18ofKOLmWjZnR7jt8k2zHp7iM2RvvdidUrm09-EQxzaJBbXzpUF2PPWWDvxFFiPKfjHqSiohX9T5Mu_66CWM2pIVDcjGp_glTVjVS_nkUAqnjYD1RjRxYukWHnfUkgi97XCNT0E1DIL7mvaGJ6sF94ICHM6nFyYb9j6XG_OftplMunkgqu0bWuhOtdCzGK3e2eepsuL6UMSj5L_HomApIaG"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-xs font-label tracking-[0.2em] uppercase text-primary mb-2 block">Cyclades Series</span>
              <h2 className="text-2xl font-display serif-italic text-on-background mb-6">Aegean Muse</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-light italic">Price per Hour</span>
                  <span className="text-primary font-medium tracking-tight">€2,850</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-light italic">Price per Seat</span>
                  <span className="text-primary font-medium tracking-tight">€420</span>
                </div>
              </div>
              <div className="mt-auto flex justify-between items-center pt-6 border-t border-primary/5">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-sm">sailing</span>
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-sm">waves</span>
                </div>
                <Link href="/checkout?vehicle_id=v12" className="text-xs uppercase tracking-widest text-primary border-b border-primary/30 pb-1 hover:tracking-[0.2em] transition-all duration-500">
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 group flex flex-col bg-surface-container border border-primary/5 rounded-lg overflow-hidden">
            <div className="aspect-[4/5] w-full relative">
              <img
                alt="Yacht Deck"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVq9hJHwt1AnLIpDiZ6dv_sbefK6mDdvCXn8rOE5qvK0XHMRX_HWSopcArts4X3yqvbosH__4wn9AKLayd4cNqDlklvz-HKJcDzgLmdFONPRJIV_GGKgKoSyLyYD0A9d9a8bR-nmDWnTANxjz-HNcsyRqIpK5gTB_AS_Rg8cMGWHDRxdhtYspuUGreRWTXfHTqrkl9K3QCJiUPNj9ubn-YOtYd6gCk9Rh2ApckCwF2HvG_Fb46hkouShuftM3T1DDUKw-CKCCrtRNT"
              />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <span className="text-xs font-label tracking-[0.2em] uppercase text-primary mb-2 block">Amalfi Explorer</span>
              <h2 className="text-2xl font-display serif-italic text-on-background mb-6">Sole di Capri</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-light italic">Price per Hour</span>
                  <span className="text-primary font-medium tracking-tight">€3,100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant font-light italic">Price per Seat</span>
                  <span className="text-primary font-medium tracking-tight">€580</span>
                </div>
              </div>
              <div className="mt-auto flex justify-between items-center pt-6 border-t border-primary/5">
                <div className="flex gap-4 text-xs font-light tracking-tighter text-on-surface-variant uppercase">
                  <span>42M</span>
                  <span>•</span>
                  <span>8 Guests</span>
                </div>
                <button className="text-xs uppercase tracking-widest text-primary border-b border-primary/30 pb-1 hover:tracking-[0.2em] transition-all duration-500">
                  Inquire
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 group grid grid-cols-1 md:grid-cols-2 bg-surface-container-high border border-primary/10 rounded-lg overflow-hidden">
            <div className="h-full min-h-[300px] relative overflow-hidden">
              <img
                alt="Black Yacht"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIjIZYTl8k_730a9th2B8NrW7m4EiHi3cIAox9bXcXjL43CR0PXOTSx8wsyZx1qLK6oIDpT6hx1TUvEs--r3j3YUc5-z1BzkiooFq5CeAxZ9TrCIA307jpIELGXXttw7NiW85LYgDC9UF0InEXvw9Nz1BBNmoHme7FoapPRJDRZVF-Rpo8Ky0PBl07E0BSgM1Z-T9ApsG0OhdrcczwMK_DnRwxD1ysNpYHLGLE8hK9nBDBsEy1k1HZmEmTkPpz0FnCvH9u_3I7jB2h"
              />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="text-xs font-label tracking-[0.3em] uppercase text-primary mb-4 block">Limited Edition</span>
              <h2 className="text-4xl font-display serif-italic text-on-background mb-4">Obsidian Noir</h2>
              <p className="text-on-surface-variant font-light text-sm leading-relaxed mb-8">
                An architectural masterpiece of the seas, finished in matte carbon fiber and Italian marble. Designed for those who command the night.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-xs font-label uppercase text-on-surface-variant/60 tracking-widest mb-1">Hourly</div>
                  <div className="text-xl font-body text-primary">€5,900</div>
                </div>
                <div>
                  <div className="text-xs font-label uppercase text-on-surface-variant/60 tracking-widest mb-1">Per Seat</div>
                  <div className="text-xl font-body text-primary">€1,100</div>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="/checkout?vehicle_id=v14" className="px-8 py-3 bg-primary text-on-primary text-xs uppercase tracking-widest font-label shadow-lg shadow-primary/20 hover:tracking-[0.2em] transition-all duration-500">
                  Book Voyage
                </Link>
                <button className="px-8 py-3 border border-primary/20 text-primary text-xs uppercase tracking-widest font-label hover:bg-primary/5 transition-all">
                  Specs
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div className="h-[1px] w-32 bg-primary/20 mb-8"></div>
          <button className="text-on-surface-variant text-xs uppercase tracking-[0.4em] font-label hover:text-primary transition-colors duration-300">
            Explore Further Fleet
          </button>
        </div>
      </main>

      <div className="fixed bottom-10 right-10 z-40">
        <div className="glass-effect bg-surface-container-highest/70 p-4 rounded-full border border-primary/20 shadow-2xl flex items-center gap-4 pr-8 group cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined">support_agent</span>
          </div>
          <div className="hidden md:block">
            <div className="text-[10px] uppercase tracking-widest text-primary font-label mb-0.5">Concierge</div>
            <div className="text-xs font-light text-on-surface">Available for Assistance</div>
          </div>
        </div>
      </div>

      <footer className="mt-20 px-12 py-12 border-t border-primary/5 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-label tracking-widest text-on-surface-variant/40 uppercase">
            © Nocturnal Atelier MMXXIV
          </div>
          <div className="flex gap-8">
            <a className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">Privacy</a>
            <a className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">Terms</a>
            <a className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">Membership</a>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
            <span className="text-xs font-label tracking-widest text-primary uppercase italic">Elite Voyager Tier</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
