// pages/results.js — Search results page (Yacht-optimized design)
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApp } from "./_app";
import { FLEET, OPERATORS } from "../lib/data";
import Link from "next/link";
import Head from "next/head";

const fmt = n => `€${Number(n).toLocaleString()}`;

export default function ResultsPage() {
  const router  = useRouter();
  const { setCart } = useApp() || {};
  const [results, setResults] = useState([]);
  const [sort,    setSort]    = useState("price");

  useEffect(() => {
    if (!router.isReady) return;
    const { category, vehicle_type, type, passengers } = router.query;
    const r = FLEET.filter(v => {
      if (type && type !== "all" && v.type !== type) return false;
      if (category==="air"   && v.type==="yacht") return false;
      if (category==="yacht" && v.type!=="yacht") return false;
      if (vehicle_type && vehicle_type!=="all" && v.type!==vehicle_type) return false;
      return v.passenger_capacity >= parseInt(passengers||1);
    });
    setResults(r);
  }, [router.isReady, router.query]);

  const sorted = [...results].sort((a,b) => sort==="price" ? a.price_per_hour-b.price_per_hour : b.passenger_capacity-a.passenger_capacity);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Manrope:wght@200;300;400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script dangerouslySetInnerHTML={{__html:`tailwind.config={darkMode:"class",theme:{extend:{"colors":{"outline-variant":"#45464d","secondary-fixed":"#d8e3fb","primary-container":"#211500","surface-container-low":"#131b2e","primary-fixed":"#ffdea5","on-secondary-fixed":"#111c2d","surface-tint":"#e9c176","on-tertiary-container":"#82817e","on-primary-container":"#9d7c39","on-error-container":"#ffdad6","surface-container":"#171f33","on-tertiary-fixed":"#1c1c1a","on-surface-variant":"#c6c6cd","primary-fixed-dim":"#e9c176","secondary":"#bcc7de","surface-container-highest":"#2d3449","secondary-fixed-dim":"#bcc7de","surface-bright":"#31394d","surface":"#0b1326","on-secondary":"#263143","on-tertiary-fixed-variant":"#474745","on-secondary-container":"#aeb9d0","tertiary-container":"#181816","on-primary-fixed-variant":"#5d4201","on-background":"#dae2fd","on-error":"#690005","background":"#0b1326","error":"#ffb4ab","inverse-primary":"#775a19","surface-dim":"#0b1326","on-primary":"#412d00","inverse-surface":"#dae2fd","secondary-container":"#3e495d","tertiary":"#c8c6c3","error-container":"#93000a","tertiary-fixed-dim":"#c8c6c3","on-primary-fixed":"#261900","surface-container-lowest":"#060e20","surface-variant":"#2d3449","primary":"#e9c176","surface-container-high":"#222a3d","on-tertiary":"#31302f","tertiary-fixed":"#e5e2df","inverse-on-surface":"#283044","on-surface":"#dae2fd","outline":"#909097","on-secondary-fixed-variant":"#3c475a"},"borderRadius":{"DEFAULT":"0.125rem","lg":"0.25rem","xl":"0.5rem","full":"0.75rem"},"fontFamily":{"headline":["Noto Serif"],"display":["Noto Serif"],"body":["Manrope"],"label":["Manrope"]}}}}` }} />
        <style dangerouslySetInnerHTML={{__html:`.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 200,'GRAD' 0,'opsz' 24;font-size:1.25rem}.glass-effect{backdrop-filter:blur(24px)}.serif-italic{font-family:'Noto Serif',serif;font-style:italic}body{background-color:#0b1326;color:#dae2fd;font-family:'Manrope',sans-serif}` }} />
      </Head>

      <div className="bg-background text-on-surface min-h-screen">
        {/* NavBar */}
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl">
          <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
            <Link href="/" className="text-xl font-serif tracking-widest text-primary uppercase">FLYOXRA</Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/" className="text-slate-400 hover:text-slate-100 transition-colors font-sans font-light tracking-tight">Charters</Link>
              <span className="text-primary font-medium border-b border-primary/30 pb-1 font-sans tracking-tight">Yachts</span>
              <Link href="/" className="text-slate-400 hover:text-slate-100 transition-colors font-sans font-light tracking-tight">Fleet</Link>
            </div>
            <span className="material-symbols-outlined text-primary cursor-pointer">account_circle</span>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </nav>

        <main className="pt-32 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
          {/* Header */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <h1 className="text-5xl md:text-7xl font-display serif-italic leading-tight text-on-background mb-4">
                  Available <span className="text-primary">Yachts</span>
                </h1>
                <p className="text-on-surface-variant font-light tracking-wide max-w-xl">
                  {results.length} {results.length === 1 ? "yacht" : "yachts"} available for your voyage.
                </p>
              </div>
              <div className="flex gap-3">
                {[["price","Price"],["capacity","Capacity"]].map(([k,l]) => (
                  <button 
                    key={k}
                    onClick={() => setSort(k)}
                    className={`px-6 py-2 rounded-full text-xs font-label uppercase tracking-widest transition-all duration-300 ${
                      sort === k 
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/10" 
                        : "bg-surface-container-high text-on-surface hover:bg-primary/20"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
            {sorted.length === 0 ? (
              <div className="md:col-span-12 text-center py-20">
                <p className="text-on-surface-variant text-lg">No yachts available for your search criteria.</p>
                <Link href="/" className="text-primary hover:underline mt-4 inline-block">← Modify Search</Link>
              </div>
            ) : (
              sorted.map((v, idx) => {
                const op = OPERATORS[v.operator_id];
                const seatPrice = Math.round(v.price_per_hour / (v.passenger_capacity || 1));
                
                // First yacht: Large featured card (8 cols)
                if (idx === 0) {
                  return (
                    <div key={v.id} className="md:col-span-8 group relative overflow-hidden rounded-lg bg-surface-container-low border border-primary/5">
                      <div className="aspect-video w-full relative">
                        <img alt={v.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={`https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
                      </div>
                      <div className="p-8 relative -mt-20 glass-effect bg-surface-container-low/60 mx-6 mb-6 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className="text-xs font-label tracking-[0.3em] uppercase text-primary mb-2 block">{op?.name}</span>
                            <h2 className="text-3xl font-display serif-italic text-on-background">{v.model}</h2>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-body font-light text-primary tracking-tighter">{fmt(v.price_per_hour)} <span className="text-xs uppercase tracking-widest text-on-surface-variant">/ hr</span></div>
                            <div className="text-sm font-body font-light text-on-surface-variant italic">{fmt(seatPrice)} per seat</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 border-t border-primary/10 pt-6">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary/60">straighten</span>
                            <div className="text-xs uppercase tracking-widest font-light">{v.range}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary/60">groups</span>
                            <div className="text-xs uppercase tracking-widest font-light">{v.passenger_capacity} Guests</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary/60">anchor</span>
                            <div className="text-xs uppercase tracking-widest font-light">{v.current_location}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
                
                // Remaining yachts: 4-col cards
                return (
                  <div key={v.id} className={`group flex flex-col bg-surface-container border border-primary/5 rounded-lg overflow-hidden ${idx % 2 === 1 ? 'md:col-span-4' : 'md:col-span-4'}`}>
                    <div className="aspect-square w-full relative overflow-hidden">
                      <img alt={v.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={`https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80`} />
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <span className="text-xs font-label tracking-[0.2em] uppercase text-primary mb-2 block">{op?.name}</span>
                      <h2 className="text-2xl font-display serif-italic text-on-background mb-6">{v.model}</h2>
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant font-light italic">Price per Hour</span>
                          <span className="text-primary font-medium tracking-tight">{fmt(v.price_per_hour)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-on-surface-variant font-light italic">Price per Seat</span>
                          <span className="text-primary font-medium tracking-tight">{fmt(seatPrice)}</span>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-between items-center pt-6 border-t border-primary/5">
                        <div className="flex gap-4 text-xs font-light tracking-tighter text-on-surface-variant uppercase">
                          <span>{v.range}</span>
                          <span>•</span>
                          <span>{v.passenger_capacity} Guests</span>
                        </div>
                        <button 
                          onClick={() => { setCart?.(v); router.push({ pathname:"/checkout", query:{ vehicle_id:v.id, ...router.query } }); }}
                          className="text-xs uppercase tracking-widest text-primary border-b border-primary/30 pb-1 hover:tracking-[0.2em] transition-all duration-500"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Load More */}
          {results.length > 0 && (
            <div className="mt-20 flex flex-col items-center">
              <div className="h-[1px] w-32 bg-primary/20 mb-8"></div>
              <Link href="/" className="text-on-surface-variant text-xs uppercase tracking-[0.4em] font-label hover:text-primary transition-colors duration-300">
                ← Modify Search
              </Link>
            </div>
          )}
        </main>

        {/* Concierge FAB */}
        <div className="fixed bottom-10 right-10 z-40">
          <div className="glass-effect bg-surface-container-highest/70 p-4 rounded-full border border-primary/20 shadow-2xl flex items-center gap-4 pr-8 cursor-pointer group hover:shadow-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div className="hidden md:block">
              <div className="text-[10px] uppercase tracking-widest text-primary font-label mb-0.5">Concierge</div>
              <div className="text-xs font-light text-on-surface">Available Now</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 px-12 py-12 border-t border-primary/5 bg-surface-container-lowest">
          <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xs font-label tracking-widest text-on-surface-variant/40 uppercase">
              © FLYOXRA MMXXIV
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">Privacy</a>
              <a href="#" className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">Terms</a>
              <a href="#" className="text-xs font-label tracking-widest text-on-surface-variant hover:text-primary transition-colors uppercase">Membership</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
