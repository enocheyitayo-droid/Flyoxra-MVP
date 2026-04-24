// components/Navbar.jsx  — ADD CurrencySelector to the nav links
//
// Only the changed section is shown. Find the nav-links div
// and add <CurrencySelector /> just before the Sign In button.
//
// ─── DIFF ──────────────────────────────────────────────────────────────────
// BEFORE:
//   import { useAuth } from '../lib/AuthContext';
//
// AFTER:
//   import { useAuth } from '../lib/AuthContext';
//   import CurrencySelector from './CurrencySelector';   // ← ADD
//
// BEFORE (inside the nav-links div):
//   {!user ? (
//     <Link href="/login">Sign In</Link>
//   ) : ( ... )}
//
// AFTER:
//   <CurrencySelector />                                 // ← ADD before sign-in
//   {!user ? (
//     <Link href="/login">Sign In</Link>
//   ) : ( ... )}
// ───────────────────────────────────────────────────────────────────────────
//
// Full updated Navbar for reference:

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth }        from '../lib/AuthContext';
import CurrencySelector   from './CurrencySelector';     // ← NEW

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const path = router.pathname;

  const handleLogout = () => { logout(); router.push('/'); };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,8,14,0.88)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--bdr)', height: 62,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        maxWidth: 1160, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500,
          color: 'var(--cream)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--gold)' }}>◆</span>
          Aero<span style={{ color: 'var(--gold)' }}>Luxe</span>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <NavLink href="/" active={path === '/'}>Home</NavLink>
          <NavLink href="/results" active={path === '/results'}>Search</NavLink>
          {user && <NavLink href="/dashboard" active={path === '/dashboard'}>Dashboard</NavLink>}

          {/* ── Currency selector ── */}
          <CurrencySelector />                             {/* ← THIS IS THE ADD */}

          {!user ? (
            <Link href="/login" style={{
              marginLeft: 8, padding: '8px 20px', borderRadius: 7,
              border: '1px solid var(--gold-bdr)', color: 'var(--gold)',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
              background: 'transparent', letterSpacing: '0.04em', transition: 'all 0.2s',
            }}>
              Sign In
            </Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--gold-bg)', border: '1px solid var(--gold-bdr)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, color: 'var(--gold)', fontWeight: 500,
              }}>
                {(user.name || 'U')[0].toUpperCase()}
              </div>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{user.name}</span>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid var(--bdr)',
                color: 'var(--muted)', padding: '7px 14px', borderRadius: 6,
                fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
              }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(href)}
      style={{
        background: 'none', border: 'none',
        color: active ? 'var(--gold)' : 'var(--muted)',
        padding: '8px 14px', borderRadius: 6, fontSize: 14,
        cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
        transition: 'color 0.2s, background 0.2s',
      }}
    >
      {children}
    </button>
  );
}
