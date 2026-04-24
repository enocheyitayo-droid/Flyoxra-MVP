import Head from "next/head";
import { useRouter } from "next/router";
import { FLEET } from "../lib/data";

export default function AmbulancePage() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary/30">
      <Head>
        <title>Nocturnal Atelier | Air Ambulance Fleet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&amp;family=Manrope:wght@300;400;500;700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
        <script>
          {`tailwind.config = {
            darkMode: "class",
            theme: {
              extend: {
                "colors": {
                      "on-primary-fixed-variant": "#5d4201",
                      "secondary-fixed-dim": "#bcc7de",
                      "inverse-surface": "#dae2fd",
                      "on-secondary-fixed": "#111c2d",
                      "error-container": "#93000a",
                      "on-surface": "#dae2fd",
                      "inverse-on-surface": "#283044",
                      "outline-variant": "#45464d",
                      "on-surface-variant": "#c6c6cd",
                      "surface": "#0b1326",
                      "secondary-container": "#3e495d",
                      "background": "#0b1326",
                      "on-error-container": "#ffdad6",
                      "surface-bright": "#31394d",
                      "surface-container-highest": "#2d3449",
                      "on-tertiary": "#31302f",
                      "inverse-primary": "#775a19",
                      "on-primary-fixed": "#261900",
                      "primary-container": "#211500",
                      "on-tertiary-container": "#82817e",
                      "tertiary-fixed-dim": "#c8c6c3",
                      "on-primary": "#412d00",
                      "surface-container-high": "#222a3d",
                      "on-secondary-fixed-variant": "#3c475a",
                      "tertiary-container": "#181816",
                      "surface-container-low": "#131b2e",
                      "surface-tint": "#e9c176",
                      "tertiary-fixed": "#e5e2df",
                      "surface-container": "#171f33",
                      "primary-fixed-dim": "#e9c176",
                      "on-tertiary-fixed": "#1c1c1a",
                      "tertiary": "#c8c6c3",
                      "primary": "#e9c176",
                      "on-tertiary-fixed-variant": "#474745",
                      "surface-container-lowest": "#060e20",
                      "primary-fixed": "#ffdea5",
                      "error": "#ffb4ab",
                      "surface-variant": "#2d3449",
                      "outline": "#909097",
                      "on-error": "#690005",
                      "surface-dim": "#0b1326",
                      "secondary": "#bcc7de",
                      "on-secondary-container": "#aeb9d0",
                      "on-background": "#dae2fd",
                      "secondary-fixed": "#d8e3fb",
                      "on-secondary": "#263143",
                      "on-primary-container": "#9d7c39"
                },
                "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
                },
                "fontFamily": {
                      "headline": ["Noto Serif"],
                      "display": ["Noto Serif"],
                      "body": ["Manrope"],
                      "label": ["Manrope"]
                }
              },
            }
          }`}
        </script>
        <style>
          {`.material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;
          }
          body {
            background-color: #0b1326;
            color: #dae2fd;
            font-family: 'Manrope', sans-serif;
          }
          .serif-italic { font-family: 'Noto Serif', serif; font-style: italic; }
          .serif-bold { font-family: 'Noto Serif', serif; font-weight: 700; }`}
        </style>
      </Head>

      <body className="bg-background text-on-surface selection:bg-primary/30">
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-2xl flex justify-between items-center h-24 px-12 w-full bg-gradient-to-b from-slate-900 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="text-2xl font-serif tracking-tighter text-[#e9c176]">The Nocturnal Atelier</div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-slate-400 font-medium hover:text-white transition-colors duration-300 hover:tracking-widest transition-all duration-500 ease-in-out" href="#">Private Jets</a>
            <a className="text-slate-400 font-medium hover:text-white transition-colors duration-300 hover:tracking-widest transition-all duration-500 ease-in-out" href="#">Helicopters</a>
            <a className="text-[#e9c176] font-serif italic relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:w-1 after:h-1 after:bg-[#e9c176] after:rounded-full hover:tracking-widest transition-all duration-500 ease-in-out" href="#">Air Ambulance</a>
            <a className="text-slate-400 font-medium hover:text-white transition-colors duration-300 hover:tracking-widest transition-all duration-500 ease-in-out" href="#">Destinations</a>
            <a className="text-slate-400 font-medium hover:text-white transition-colors duration-300 hover:tracking-widest transition-all duration-500 ease-in-out" href="#">Concierge</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-[#e9c176] text-[#412d00] px-6 py-2.5 rounded-md font-bold text-sm tracking-widest uppercase scale-100 active:scale-95 transition-transform">Inquire Now</button>
          </div>
        </nav>

        <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <header className="mb-16 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-display text-on-surface mb-4 leading-tight">Critical Care: <br/><span className="serif-italic text-primary">Air Ambulance Fleet</span></h1>
            <p className="text-on-surface-variant max-w-2xl text-lg font-light leading-relaxed">Precision medical aviation for time-sensitive global repatriation and emergency transport. Every aircraft is a mobile intensive care unit, manned by world-class clinical experts.</p>
          </header>

          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-32 space-y-10">
                <section>
                  <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Equipment Level</h3>
                  <div className="space-y-4">
                    <label className="flex items-center group cursor-pointer">
                      <div className="w-5 h-5 border border-outline-variant rounded-sm flex items-center justify-center mr-3 group-hover:border-primary transition-colors">
                        <span className="material-symbols-outlined text-primary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                      <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Full ICU Suite</span>
                    </label>
                    <label className="flex items-center group cursor-pointer">
                      <div className="w-5 h-5 border border-outline-variant rounded-sm mr-3 group-hover:border-primary transition-colors"></div>
                      <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Pediatric/Neonatal</span>
                    </label>
                    <label className="flex items-center group cursor-pointer">
                      <div className="w-5 h-5 border border-outline-variant rounded-sm mr-3 group-hover:border-primary transition-colors"></div>
                      <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Bariatric Capability</span>
                    </label>
                  </div>
                </section>
                <section>
                  <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Response Time</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left py-2 px-4 rounded bg-surface-container-high text-primary text-xs border border-primary/20">Under 120 Minutes</button>
                    <button className="text-left py-2 px-4 rounded bg-transparent text-on-surface-variant text-xs hover:bg-surface-container transition-colors">Scheduled Repatriation</button>
                  </div>
                </section>
                <section>
                  <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-6">Global Reach</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-on-surface-variant">Trans-Atlantic</span>
                      <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-on-surface-variant">Trans-Pacific</span>
                      <span className="bg-surface-container-highest px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-on-surface-variant">Remote Access</span>
                    </div>
                  </div>
                </section>
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group bg-surface-container-low rounded-lg overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="luxury medical aircraft interior of a Learjet 45XR showing a sleek medical bed with advanced monitoring equipment in a high-end cabin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcCveh2t66VKk7Sgy13WhtdxVIlTaJ0xFxzg74vbc98c23QAQY8CzOwnjcjCJmxscM2Cx5oU4dfnqmpr2CCqaIYNlbXPp6Tv8L_YgBA9KkCUclQUIxWKPKaUhQ8IJMaCxogDkOhoylxkuKdNHT-omxnZf7sEKR93ysCinZ1a8Y8K8y8B4oZBB0_UOAL3aoR0V5Y9Ac9_jFcNImjPMVwNpOlu4LPYEjBHZUrkT__-uU1p9sUkbsu4k1WknTRC4jzXeOwnZHH-mreWff" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-sm border border-primary/20">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">Fast Response</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-display text-on-surface group-hover:text-primary transition-colors">Learjet 45XR</h2>
                        <p className="text-xs text-on-surface-variant/60 font-label tracking-widest mt-1 uppercase">Mid-Size Medical Jet</p>
                      </div>
                      <div className="text-right">
                        <span className="material-symbols-outlined text-primary/40">emergency</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-outline-variant/30 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Crew Capacity</span>
                        <span className="text-sm font-medium mt-1">2 Pilots + 2 Medical</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Max Range</span>
                        <span className="text-sm font-medium mt-1">2,100 nm</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Configuration</span>
                        <span className="text-sm font-medium mt-1">Full ICU Setup</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Payload</span>
                        <span className="text-sm font-medium mt-1">1 Patient + 1 Family</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button onClick={() => router.push('/checkout?vehicle_id=v9')} className="w-full py-4 border border-primary/20 text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300 font-bold">
                        Inquire for Urgent Charter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="group bg-surface-container-low rounded-lg overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="medical configuration inside a Pilatus PC-12 turboprop with specialized life support systems and wood-grain accents in a modern medical cabin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLZaDOblxnGlZNCkrvd4q0yrhHKBbphMpd6BNMaBvecVRIE-lP7kwP01Oq5ivYh8S3rWucjsNzpSn_8VE62dtb-GQRJpj0PDAhytkPaTBf85refSGpJ3zsXLeumsMa8U85XiH_uSwqKoo1rivyCRZj0518ONF3Ljhq6LBFFmpwIK0ql3LzS5FirgUvD4qBygU2zP5kL7GE4LWXJDttDddw_3zs_d2cInsrUAF1YLZaA06_hW1Y2R3BrDj10v9upcP5iW4H7fuFLGJw" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-sm border border-primary/20">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">Short Runway</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-display text-on-surface group-hover:text-primary transition-colors">Pilatus PC-12</h2>
                        <p className="text-xs text-on-surface-variant/60 font-label tracking-widest mt-1 uppercase">Versatile Turboprop</p>
                      </div>
                      <div className="text-right">
                        <span className="material-symbols-outlined text-primary/40">altitude</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-outline-variant/30 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Crew Capacity</span>
                        <span className="text-sm font-medium mt-1">1 Pilot + 2 Medical</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Max Range</span>
                        <span className="text-sm font-medium mt-1">1,800 nm</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Configuration</span>
                        <span className="text-sm font-medium mt-1">Neonatal Specialist</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Runway Req</span>
                        <span className="text-sm font-medium mt-1">Unpaved/Short</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button onClick={() => router.push('/checkout?vehicle_id=v10')} className="w-full py-4 border border-primary/20 text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300 font-bold">
                        Inquire for Urgent Charter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="group bg-surface-container-low rounded-lg overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="wide body medical jet interior of a Challenger 605 featuring dual stretchers and comprehensive life support systems in a spacious luxury cabin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChlnMh7PmH0jPJ_HDIvFPUZ3fl6LlUPpX4OmZeV_5Y5vzvv7zzkHUAqrwyWHimkJsA_VXp7WWFw9_JA3xQEUkSCSGZMadUAEtvKPlvFd1Kle06vWdC89SDIyvxUHc25rSdRwsS-QcNAdgiDYmamPEdCRWvvpdyZLyImCoYjwQzxm9ETqgB9I7Ib_SxqWM17wppdxUshgx5zzZd0yL3eVYKEKKIUMxU3BNNqO7jBp9N7BoaFkNUXPKZT_hYhvQ1gS6Et7zqAYNdKEIu" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-sm border border-primary/20">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">Ultra-Long Range</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-display text-on-surface group-hover:text-primary transition-colors">Challenger 605</h2>
                        <p className="text-xs text-on-surface-variant/60 font-label tracking-widest mt-1 uppercase">Large Cabin Medical</p>
                      </div>
                      <div className="text-right">
                        <span className="material-symbols-outlined text-primary/40">public</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-outline-variant/30 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Crew Capacity</span>
                        <span className="text-sm font-medium mt-1">2 Pilots + 3 Medical</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Max Range</span>
                        <span className="text-sm font-medium mt-1">4,000 nm</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Configuration</span>
                        <span className="text-sm font-medium mt-1">Dual ICU Bed</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Cabin Height</span>
                        <span className="text-sm font-medium mt-1">6ft 1in (Full Stand-up)</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button onClick={() => router.push('/checkout?vehicle_id=v11')} className="w-full py-4 border border-primary/20 text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300 font-bold">
                        Inquire for Urgent Charter
                      </button>
                    </div>
                  </div>
                </div>

                <div className="group bg-surface-container-low rounded-lg overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="relative h-64 overflow-hidden">
                    <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="extremely high-end medical jet interior for a Bombardier Global 6000 with mood lighting and state-of-the-art medical monitors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_j6V6cHDVRmKbWuAm9qDeEDmc_UGO560cU55vUbItC06EJgt5XmF67V5OjlRkR4GUFvThXqjD7qUjTlN5yFRTVB_zeAorHBSjVP42M_boruXjl4mdy06T4qXpUv8qwn8cJ0DCqyYAp_qeJJahz5hrYeJ3HKR5Uq-ifrmBQ8xlh23TE3ksFwYoD8egf6y8Jvc2o-IxcIoZAL2i39t7kDdtColear4iAVMr6FII20j9R79kVFTksiqsiNNZKJ7J0fEuLelXnb7IupTA" />
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-sm border border-primary/20">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-bold">Global Reach</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-2xl font-display text-on-surface group-hover:text-primary transition-colors">Global 6000</h2>
                        <p className="text-xs text-on-surface-variant/60 font-label tracking-widest mt-1 uppercase">Intercontinental Medical</p>
                      </div>
                      <div className="text-right">
                        <span className="material-symbols-outlined text-primary/40">rocket_launch</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 border-t border-outline-variant/30 pt-6">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Crew Capacity</span>
                        <span className="text-sm font-medium mt-1">3 Pilots + 4 Medical</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Max Range</span>
                        <span className="text-sm font-medium mt-1">6,000 nm</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Configuration</span>
                        <span className="text-sm font-medium mt-1">Multi-Patient Critical</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Specialty</span>
                        <span className="text-sm font-medium mt-1">Direct Repatriation</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <button onClick={() => router.push('/checkout?vehicle_id=v9')} className="w-full py-4 border border-primary/20 text-primary text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300 font-bold">
                        Inquire for Urgent Charter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="fixed bottom-12 right-12 z-40">
          <button className="bg-surface-container-highest/70 backdrop-blur-2xl border border-primary/20 p-5 rounded-full shadow-2xl group flex items-center gap-4 hover:border-primary/50 transition-all duration-500">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
            </div>
            <div className="flex flex-col text-left pr-4">
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">24/7 Response Desk</span>
              <span className="text-sm font-medium text-on-surface">+1 (800) OBSIDIAN</span>
            </div>
          </button>
        </div>

        <footer className="bg-slate-950 w-full py-12 px-12 border-t border-[#e9c176]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 w-full">
          <div className="text-slate-500 font-label tracking-tight text-xs uppercase">© 2024 Obsidian Reserve. The Art of Arrival.</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="text-slate-500 font-label tracking-tight text-xs uppercase hover:text-[#e9c176] transition-colors duration-300" href="#">Charter Terms</a>
            <a className="text-slate-500 font-label tracking-tight text-xs uppercase hover:text-[#e9c176] transition-colors duration-300" href="#">Privacy Policy</a>
            <a className="text-slate-500 font-label tracking-tight text-xs uppercase hover:text-[#e9c176] transition-colors duration-300" href="#">Fleet Specifications</a>
            <a className="text-slate-500 font-label tracking-tight text-xs uppercase hover:text-[#e9c176] transition-colors duration-300" href="#">Global Logistics</a>
            <a className="text-slate-500 font-label tracking-tight text-xs uppercase hover:text-[#e9c176] transition-colors duration-300" href="#">Member Login</a>
          </div>
        </footer>
      </body>
    </div>
  );
}