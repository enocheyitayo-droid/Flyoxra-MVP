import { useState } from "react";
import { useRouter } from "next/router";
import { useApp } from "../_app";
import { getUserByEmail } from "../../lib/data";
import Link from "next/link";
const T={bg:"#060A14",card:"#0C1220",inp:"#0F1A2E",bd:"#1A2540",gold:"#BF9B54",cream:"#ECE8DF",muted:"#6B7A9C"};
const I={width:"100%",background:T.inp,border:`1px solid ${T.bd}`,borderRadius:8,padding:"10px 14px",color:T.cream,fontSize:13,outline:"none",boxSizing:"border-box"};
export default function Login() {
  const router = useRouter(); const { setUser, showToast } = useApp()||{};
  const [f, setF] = useState({email:"",password:""});
  const submit = () => {
    const u = getUserByEmail(f.email);
    if (!u||u.password!==f.password) { showToast?.("Invalid credentials","err"); return; }
    setUser?.(u); showToast?.(`Welcome back, ${u.name.split(" ")[0]}!`); router.push(u.role==="operator"?"/operator":"/dashboard");
  };
  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:12,padding:"2rem",width:"100%",maxWidth:380}}>
        <h2 style={{fontSize:20,fontWeight:800,color:T.cream,margin:"0 0 1.5rem",textAlign:"center"}}>✦ LUXAIR · Sign In</h2>
        <div style={{marginBottom:12}}><label style={{display:"block",fontSize:10,color:T.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.1em"}}>Email</label><input style={I} type="email" value={f.email} onChange={e=>setF(p=>({...p,email:e.target.value}))}/></div>
        <div style={{marginBottom:"1.5rem"}}><label style={{display:"block",fontSize:10,color:T.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.1em"}}>Password</label><input style={I} type="password" value={f.password} onChange={e=>setF(p=>({...p,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        <button onClick={submit} style={{background:T.gold,color:"#0A0C14",border:"none",borderRadius:8,padding:"13px",width:"100%",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Sign In →</button>
        <p style={{textAlign:"center",marginTop:"1rem",fontSize:12,color:T.muted}}>No account? <Link href="/auth/register" style={{color:T.gold}}>Sign up free</Link></p>
        <div style={{marginTop:"1rem",background:"#111827",borderRadius:8,padding:"10px 12px",fontSize:11,color:T.muted,lineHeight:1.8}}>Demo: james@charter.com / <code style={{color:T.gold}}>demo</code></div>
      </div>
    </div>
  );
}
