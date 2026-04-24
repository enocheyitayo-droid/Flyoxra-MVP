import { useState } from "react";
import { useRouter } from "next/router";
import { useApp } from "../_app";
import { usersStore, getUserByEmail } from "../../lib/data";
import Link from "next/link";
const T={bg:"#060A14",card:"#0C1220",inp:"#0F1A2E",bd:"#1A2540",gold:"#BF9B54",cream:"#ECE8DF",muted:"#6B7A9C"};
const I={width:"100%",background:T.inp,border:`1px solid ${T.bd}`,borderRadius:8,padding:"10px 14px",color:T.cream,fontSize:13,outline:"none",boxSizing:"border-box"};
export default function Register() {
  const router = useRouter(); const { setUser, showToast } = useApp()||{};
  const [f, setF] = useState({name:"",email:"",password:""});
  const submit = () => {
    if (!f.name||!f.email||!f.password) { showToast?.("All fields required","err"); return; }
    if (getUserByEmail(f.email)) { showToast?.("Email already registered","err"); return; }
    const u = {id:"u"+Date.now(),name:f.name,email:f.email,password:f.password,role:"client",operator_id:null,tier:"Silver"};
    usersStore.push(u); setUser?.(u); showToast?.(`Welcome, ${u.name.split(" ")[0]}!`); router.push("/dashboard");
  };
  return (
    <div style={{minHeight:"100vh",background:T.bg,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:12,padding:"2rem",width:"100%",maxWidth:380}}>
        <h2 style={{fontSize:20,fontWeight:800,color:T.cream,margin:"0 0 1.5rem",textAlign:"center"}}>✦ LUXAIR · Create Account</h2>
        {["Name","Email","Password"].map(lbl=>(
          <div key={lbl} style={{marginBottom:12}}>
            <label style={{display:"block",fontSize:10,color:T.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{lbl}</label>
            <input style={I} type={lbl==="Password"?"password":lbl==="Email"?"email":"text"} value={f[lbl.toLowerCase()]} onChange={e=>setF(p=>({...p,[lbl.toLowerCase()]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()}/>
          </div>
        ))}
        <button onClick={submit} style={{background:T.gold,color:"#0A0C14",border:"none",borderRadius:8,padding:"13px",width:"100%",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>Create Account →</button>
        <p style={{textAlign:"center",marginTop:"1rem",fontSize:12,color:T.muted}}>Already a member? <Link href="/auth/login" style={{color:T.gold}}>Sign in</Link></p>
      </div>
    </div>
  );
}
