// pages/dashboard.js — User Dashboard
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApp } from "./_app";
import Head from "next/head";

export default function Dashboard() {
  const router = useRouter();
  const { user } = useApp() || {};
  const [bookings, setBookings] = useState([]);
  const [profile, setProfile] = useState({
    name: "Alexander V.",
    tier: "Black Tier",
    flightHours: 142,
    maxHours: 200,
    concierge: true,
    loungeAccess: "Global Elite"
  });

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Mock data - in real app, fetch from API
    setBookings([
      {
        id: "FX-902",
        type: "flight",
        title: "London → Tokyo",
        status: "confirmed",
        date: "Oct 24, 09:15 AM",
        aircraft: "Global 7500",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
        location: "Tokyo"
      },
      {
        id: "CON-001",
        type: "concierge",
        title: "Malé Getaway",
        status: "processing",
        date: "Nov 12, 02:40 PM",
        aircraft: "Villa",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        location: "Maldives"
      }
    ]);
  }, [user, router]);

  const getStatusColor = (status) => {
    return status === "confirmed" ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface";
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case "flight": return "flight";
      case "yacht": return "sailing";
      case "concierge": return "wine_bar";
      default: return "event_available";
    }
  };

  const progressPercentage = (profile.flightHours / profile.maxHours) * 100;

  if (!user) return null;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>Dashboard - FLYOXRA</title>
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
            .glass-card { backdrop-filter: blur(24px); }
            .ghost-border { border: 1px solid rgba(233, 193, 118, 0.15); }
        `}}
        />
      </Head>

      <div className="bg-background text-on-background selection:bg-primary/30 min-h-screen">
        {/* SideNavBar */}
        <aside className="h-screen w-64 fixed left-0 top-0 border-r border-white/5 bg-zinc-950 flex flex-col py-10 px-6 z-50">
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>diamond</span>
              </div>
              <div>
                <h1 className="text-xl font-serif text-[#e9c176]">FLYOXRA</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Private Atelier</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {/* Active Tab: Dashboard */}
            <Link href="/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#e9c176] bg-zinc-900/50 border-r-2 border-[#e9c176] transition-all duration-300">
              <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
              <span className="font-label text-sm tracking-wide">Dashboard</span>
            </Link>
            <Link href="/dashboard/bookings" className="flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-all duration-300">
              <span className="material-symbols-outlined" data-icon="event_available">event_available</span>
              <span className="font-label text-sm tracking-wide">My Bookings</span>
            </Link>
            <Link href="/fleet" className="flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-all duration-300">
              <span className="material-symbols-outlined" data-icon="flight_takeoff">flight_takeoff</span>
              <span className="font-label text-sm tracking-wide">Fleet</span>
            </Link>
            <Link href="/dashboard/invoices" className="flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-all duration-300">
              <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
              <span className="font-label text-sm tracking-wide">Invoices</span>
            </Link>
            <Link href="/concierge" className="flex items-center gap-4 px-4 py-3 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 transition-all duration-300">
              <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
              <span className="font-label text-sm tracking-wide">Concierge</span>
            </Link>
          </nav>

          <div className="mt-auto pt-10 border-t border-white/5">
            <div className="flex items-center gap-3">
              <img
                alt="User Profile"
                className="w-10 h-10 rounded-full object-cover ghost-border"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              />
              <div>
                <p className="text-sm font-medium text-on-surface">{profile.name}</p>
                <p className="text-[10px] text-primary/70 uppercase tracking-widest">{profile.tier}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="ml-64 min-h-screen pb-20">
          {/* Header Section */}
          <header className="px-12 py-12 flex justify-between items-end">
            <div>
              <h2 className="text-4xl font-serif text-on-surface mb-2">Welcome back, {profile.name.split(' ')[0]}</h2>
              <p className="text-on-surface-variant font-label text-sm tracking-[0.1em] uppercase">Your next journey awaits in 48 hours.</p>
            </div>
            <div className="flex gap-4">
              <Link href="/" className="px-6 py-2 border border-primary/20 text-primary text-xs uppercase tracking-[0.2em] rounded hover:bg-primary/5 transition-all">
                Request Charter
              </Link>
            </div>
          </header>

          <div className="px-12 grid grid-cols-12 gap-8">
            {/* Profile Summary (Bento Style) */}
            <section className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-surface-container-low rounded-xl p-8 ghost-border relative overflow-hidden h-full flex flex-col justify-between">
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Membership Status</span>
                  <h3 className="text-3xl font-serif mt-2 mb-6">{profile.tier}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-sm text-on-surface-variant">Annual Flight Hours</span>
                      <span className="text-sm font-medium text-on-surface">{profile.flightHours} / {profile.maxHours}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-sm text-on-surface-variant">Priority Concierge</span>
                      <span className="text-sm text-primary material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-on-surface-variant">Lounge Access</span>
                      <span className="text-sm font-medium text-on-surface">{profile.loungeAccess}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-surface-container-highest rounded-lg border border-primary/10">
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                    You are <span className="text-primary">{profile.maxHours - profile.flightHours} hours</span> away from achieving <span className="italic font-serif">Titanium Status</span>.
                  </p>
                  <div className="w-full bg-background h-1 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{width: `${progressPercentage}%`}}></div>
                  </div>
                </div>

                {/* Subtle Background Aesthetic */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              </div>
            </section>

            {/* Upcoming Bookings (Visual Cards) */}
            <section className="col-span-12 lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-serif text-on-surface">Upcoming Bookings</h4>
                <Link href="/dashboard/bookings" className="text-[10px] uppercase tracking-widest text-primary hover:tracking-[0.2em] transition-all">
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="group cursor-pointer">
                    <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                      <img
                        alt={`${booking.location} destination`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={booking.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-widest rounded-sm ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="text-[10px] text-white/70 uppercase tracking-widest">{booking.id}</span>
                        </div>
                        <h5 className="text-2xl font-serif text-white">{booking.title}</h5>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <div>
                        <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                          {booking.type === "concierge" ? "Arrival" : "Departure"}
                        </p>
                        <p className="text-sm font-medium">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-on-surface-variant uppercase tracking-widest">
                          {booking.type === "concierge" ? "Villa" : "Aircraft"}
                        </p>
                        <p className="text-sm font-medium">{booking.aircraft}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Past Bookings (Asymmetric Grid) */}
            <section className="col-span-12 mt-12">
              <h4 className="text-xl font-serif text-on-surface mb-8">History & Archive</h4>
              <div className="space-y-4">
                {/* Sample past bookings - in real app, fetch from API */}
                <div className="grid grid-cols-12 items-center bg-surface-container-low/40 p-6 rounded-lg hover:bg-surface-container-low transition-colors ghost-border">
                  <div className="col-span-4 flex items-center gap-6">
                    <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">sailing</span>
                    </div>
                    <div>
                      <p className="text-sm font-serif">Mediterranean Cruise</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Yacht · The Solara</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm">August 14 - 21, 2023</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm">Monaco - Amalfi Coast</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <button className="text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Details</button>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center bg-surface-container-low/40 p-6 rounded-lg hover:bg-surface-container-low transition-colors ghost-border">
                  <div className="col-span-4 flex items-center gap-6">
                    <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">flight</span>
                    </div>
                    <div>
                      <p className="text-sm font-serif">Paris Fashion Week</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Jet · Falcon 8X</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm">September 25, 2023</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm">New York (TEB) - Paris (LBG)</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <button className="text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Details</button>
                  </div>
                </div>

                <div className="grid grid-cols-12 items-center bg-surface-container-low/40 p-6 rounded-lg hover:bg-surface-container-low transition-colors ghost-border">
                  <div className="col-span-4 flex items-center gap-6">
                    <div className="w-12 h-12 rounded bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">wine_bar</span>
                    </div>
                    <div>
                      <p className="text-sm font-serif">Napa Valley Private Tour</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Experience · Curated</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm">June 02, 2023</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest mb-1">Location</p>
                    <p className="text-sm">Saint Helena, California</p>
                  </div>
                  <div className="col-span-2 text-right">
                    <button className="text-[10px] uppercase tracking-widest text-primary/60 hover:text-primary transition-colors">Details</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Floating Concierge Widget */}
          <div className="fixed bottom-8 right-8 z-40">
            <div className="glass-card ghost-border p-4 rounded-full flex items-center gap-4 shadow-2xl shadow-black/50">
              <div className="flex -space-x-2">
                <img
                  alt="Concierge"
                  className="w-10 h-10 rounded-full border-2 border-surface object-cover"
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
                />
                <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>chat</span>
                </div>
              </div>
              <div className="pr-4">
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest leading-none">Your Concierge</p>
                <p className="text-sm font-medium text-on-surface">Available Now</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
