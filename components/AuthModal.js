// components/AuthModal.js
import { useState } from "react";
import { useApp } from "../pages/_app";

export default function AuthModal({ onClose }) {
  const { setUser, showToast } = useApp();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const body     = mode === "login"
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };

    const res  = await fetch(endpoint, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
    const data = await res.json();

    if (!res.ok) { showToast(data.error, "err"); return; }

    setUser(data.user);
    showToast(`Welcome${mode==="login" ? " back" : ""}, ${data.user.name.split(" ")[0]}!`);
    onClose();
  };

  const C = { bg:"#080C18", card:"#0D1526", elev:"#131D32", inp:"#18243C", bd:"#1E2E4A", gold:"#C9A84C", cr:"#EDE8DC", mt:"#7580A0" };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(4,7,16,0.92)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:C.card, border:`1px solid ${C.bd}`, borderRadius:12, padding:"2rem", width:"100%", maxWidth:400, position:"relative", fontFamily:"'Helvetica Neue',Arial,sans-serif" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"none", border:"none", color:C.mt, fontSize:22, cursor:"pointer" }}>×</button>

        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <svg width="32" height="32" viewBox="0 0 22 22" style={{ marginBottom:8 }}>
            <polygon points="11,1 21,8 17,20 5,20 1,8" fill={C.gold} />
          </svg>
          <h2 style={{ fontSize:22, fontWeight:700, color:C.cr, margin:"0 0 0.25rem" }}>{mode==="login" ? "Welcome back" : "Create Account"}</h2>
          <p style={{ fontSize:13, color:C.mt }}>LUXAIR Global Charter Network</p>
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom:12 }}>
            <label style={{ display:"block", fontSize:11, color:C.mt, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>Full Name</label>
            <input value={form.name} onChange={e=>set("name",e.target.value)} placeholder="Your full name" />
          </div>
        )}
        <div style={{ marginBottom:12 }}>
          <label style={{ display:"block", fontSize:11, color:C.mt, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>Email</label>
          <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com" />
        </div>
        <div style={{ marginBottom:"1.5rem" }}>
          <label style={{ display:"block", fontSize:11, color:C.mt, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>Password</label>
          <input type="password" value={form.password} onChange={e=>set("password",e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&submit()} />
        </div>

        <button className="btn-gold" onClick={submit} style={{ width:"100%", padding:"13px", fontSize:15 }}>
          {mode==="login" ? "Sign In" : "Create Account"} →
        </button>

        <div style={{ textAlign:"center", marginTop:"1.25rem", fontSize:13, color:C.mt }}>
          {mode==="login" ? "No account? " : "Already a member? "}
          <span onClick={() => setMode(mode==="login"?"signup":"login")} style={{ color:C.gold, cursor:"pointer", fontWeight:600 }}>
            {mode==="login" ? "Sign up free" : "Sign in"}
          </span>
        </div>

        <div style={{ marginTop:"1.5rem", background:C.elev, borderRadius:8, padding:"12px 14px", fontSize:12, color:C.mt, lineHeight:1.8 }}>
          <strong style={{ color:C.cr, display:"block", marginBottom:4 }}>Demo Accounts</strong>
          Client — james@charter.com / <code style={{ color:C.gold }}>demo</code><br />
          Operator — alex@aeroelite.com / <code style={{ color:C.gold }}>demo</code>
        </div>
      </div>
    </div>
  );
}
