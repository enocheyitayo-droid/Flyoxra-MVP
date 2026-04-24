// components/Navbar.js
import { useRouter } from "next/router";
import { useApp } from "../pages/_app";

export default function Navbar({ onAuthOpen }) {
  const router = useRouter();
  const { user, setUser } = useApp();

  const logout = () => {
    setUser(null);
    fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <nav style={{
      background: "rgba(8,12,24,0.97)", borderBottom: "1px solid #1E2E4A",
      padding: "0 2rem", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: 62, position: "sticky",
      top: 0, zIndex: 200, backdropFilter: "blur(12px)",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:"2.5rem" }}>
        <div onClick={() => router.push("/")} style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:"0.65rem" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polygon points="11,1 21,8 17,20 5,20 1,8" fill="#C9A84C" />
          </svg>
          <span style={{ fontSize:17, fontWeight:800, letterSpacing:"0.08em", color:"#EDE8DC" }}>LUXAIR</span>
        </div>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {["✈ Jets","🚁 Helicopters","🏥 Ambulances","⛵ Yachts"].map(l => (
            <span key={l} onClick={() => router.push("/")} style={{ fontSize:12, color:"#7580A0", cursor:"pointer" }}>{l}</span>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
        {user ? (
          <>
            <span style={{ fontSize:12, color:"#C9A84C", marginRight:4, letterSpacing:"0.05em" }}>{user.tier} Member</span>
            <button className="btn-ghost" onClick={() => router.push(user.role === "operator" ? "/operator" : "/dashboard")}>Dashboard</button>
            <button className="btn-ghost" style={{ fontSize:12, padding:"8px 16px" }} onClick={logout}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="btn-ghost" onClick={onAuthOpen}>Sign In</button>
            <button className="btn-gold" onClick={onAuthOpen}>Book Now</button>
          </>
        )}
      </div>
    </nav>
  );
}
