// pages/operator.js — Operator dashboard
import { useState } from "react";
import { useApp } from "./_app";
import { bookingsStore, FLEET, OPERATORS } from "../lib/data";
import Link from "next/link";

const T={bg:"#060A14",card:"#0C1220",elev:"#111827",inp:"#0F1A2E",bd:"#1A2540",gold:"#BF9B54",cream:"#ECE8DF",muted:"#6B7A9C",ok:"#27AE7A",warn:"#E8A020",err:"#C0392B"};
const I={width:"100%",background:T.inp,border:`1px solid ${T.bd}`,borderRadius:8,padding:"10px 14px",color:T.cream,fontSize:13,outline:"none",boxSizing:"border-box"};
const L={display:"block",fontSize:10,color:T.muted,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.12em",fontWeight:500};
const fmt = n => `$${Number(n).toLocaleString()}`;
const TYPE_META={jet:{icon:"✈",label:"Private Jet",color:"#D4AF6A"},helicopter:{icon:"⚡",label:"Helicopter",color:"#7EC8E3"},ambulance:{icon:"⊕",label:"Air Ambulance",color:"#E07070"},yacht:{icon:"⛵",label:"Superyacht",color:"#6ECDB1"}};

export default function OperatorDash() {
  const { user, showToast } = useApp() || {};
  const [tab, setTab]     = useState("requests");
  const [bookings, setBks] = useState(bookingsStore);
  const [fleetLocal, setFL]= useState(() => FLEET.filter(v=>v.operator_id===user?.operator_id));
  const [showForm, setSF]  = useState(false);
  const [nv, setNv]        = useState({type:"jet",model:"",passenger_capacity:10,price_per_hour:5000,current_location:""});

  if (!user || user.role !== "operator") return <div style={{padding:"5rem",textAlign:"center",color:T.muted,background:T.bg,minHeight:"100vh",fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>Operator access required. <Link href="/" style={{color:T.gold}}>Go home</Link></div>;

  const op        = OPERATORS[user.operator_id];
  const opVids    = fleetLocal.map(v=>v.id);
  const opBks     = bookings.filter(b=>opVids.includes(b.vehicle_id));
  const pending   = opBks.filter(b=>b.status==="pending");
  const revenue   = opBks.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.total,0);

  const updateStatus = async (id, status) => {
    setBks(p => p.map(b => b.id===id ? {...b,status} : b));
    showToast?.(status==="confirmed" ? "✓ Booking confirmed." : "Booking declined.");
  };

  const addVehicle = () => {
    if (!nv.model||!nv.current_location) return;
    const v = {id:"v"+Date.now(),...nv,passenger_capacity:+nv.passenger_capacity,price_per_hour:+nv.price_per_hour,operator_id:user.operator_id,range:"Custom",speed:"N/A",cabinClass:"Custom"};
    FLEET.push(v); setFL(p=>[...p,v]); setNv({type:"jet",model:"",passenger_capacity:10,price_per_hour:5000,current_location:""}); setSF(false);
    showToast?.("Aircraft added to fleet.");
  };

  const Tab = ({k,l}) => <button onClick={()=>setTab(k)} style={{padding:"8px 20px",borderRadius:6,fontSize:12,fontWeight:800,cursor:"pointer",background:tab===k?T.gold:"transparent",color:tab===k?"#0A0C14":T.muted,border:tab===k?"none":`1px solid ${T.bd}`,fontFamily:"inherit"}}>{l}</button>;

  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.cream,fontFamily:"'Helvetica Neue',Arial,sans-serif",padding:"2rem",maxWidth:1100,margin:"0 auto"}}>
      <div style={{marginBottom:"2rem"}}>
        <div style={{fontSize:10,color:T.gold,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:4}}>Operator Console</div>
        <h1 style={{fontSize:28,fontWeight:200,color:T.cream}}>{op?.name}</h1>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:"2rem"}}>
        {[["Fleet",fleetLocal.length,null],["Active",opBks.filter(b=>b.status==="confirmed").length,T.ok],["Pending",pending.length,T.warn],["Revenue",fmt(revenue),T.gold]].map(([l,v,c])=>(
          <div key={l} style={{background:T.elev,borderRadius:10,padding:"1rem 1.25rem"}}>
            <div style={{fontSize:10,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:5}}>{l}</div>
            <div style={{fontSize:22,fontWeight:800,color:c||T.cream}}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:"1.5rem"}}>
        <Tab k="requests" l={`Requests${pending.length?` (${pending.length})`:""}`}/>
        <Tab k="fleet" l="Fleet"/>
      </div>

      {tab==="requests" && (
        <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:12,padding:"1.5rem"}}>
          {opBks.length===0 ? <div style={{textAlign:"center",padding:"3rem",color:T.muted}}>No requests yet.</div>
          : opBks.map(b=>{
            const v = FLEET.find(f=>f.id===b.vehicle_id);
            const STATUS={confirmed:T.ok,pending:T.warn,rejected:T.err};
            return (
              <div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"1rem 0",borderBottom:`1px solid ${T.bd}`,flexWrap:"wrap",gap:8}}>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:T.cream,marginBottom:3}}>{TYPE_META[b.type]?.icon} {v?.model} — {b.route||b.label}</div>
                  <div style={{fontSize:11,color:T.muted}}>{b.date} · {b.time} · {b.duration||b.dur}h · {b.passengers||b.pax}pax · <span style={{color:T.gold,fontWeight:700}}>{fmt(b.total)}</span>{b.booking_type==="immediate"&&<span style={{color:T.ok,marginLeft:8,fontWeight:700}}>⚡ Immediate</span>}</div>
                </div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:10,padding:"3px 9px",borderRadius:20,background:`${STATUS[b.status]||T.muted}20`,color:STATUS[b.status]||T.muted,fontWeight:700,textTransform:"capitalize"}}>{b.status}</span>
                  {b.status==="pending" && <>
                    <button onClick={()=>updateStatus(b.id,"confirmed")} style={{background:`${T.ok}18`,color:T.ok,border:`1px solid ${T.ok}44`,borderRadius:6,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>✓ Accept</button>
                    <button onClick={()=>updateStatus(b.id,"rejected")}  style={{background:`${T.err}18`,color:T.err,border:`1px solid ${T.err}44`,borderRadius:6,padding:"6px 14px",fontSize:12,cursor:"pointer",fontWeight:700,fontFamily:"inherit"}}>✕ Decline</button>
                  </>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab==="fleet" && (
        <>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:"1rem"}}>
            <button onClick={()=>setSF(p=>!p)} style={{background:T.gold,color:"#0A0C14",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>+ Add Aircraft</button>
          </div>
          {showForm && (
            <div style={{background:T.card,border:`1px solid ${T.gold}44`,borderRadius:12,padding:"1.5rem",marginBottom:"1.25rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
                <div><label style={L}>Type</label><select style={I} value={nv.type} onChange={e=>setNv(p=>({...p,type:e.target.value}))}>{["jet","helicopter","ambulance","yacht"].map(t=><option key={t}>{t}</option>)}</select></div>
                <div><label style={L}>Model</label><input style={I} value={nv.model} onChange={e=>setNv(p=>({...p,model:e.target.value}))} placeholder="Gulfstream G650"/></div>
                <div><label style={L}>Capacity</label><input style={I} type="number" value={nv.passenger_capacity} onChange={e=>setNv(p=>({...p,passenger_capacity:e.target.value}))}/></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:"1rem"}}>
                <div><label style={L}>Price/hr (USD)</label><input style={I} type="number" value={nv.price_per_hour} onChange={e=>setNv(p=>({...p,price_per_hour:e.target.value}))}/></div>
                <div><label style={L}>Location</label><input style={I} value={nv.current_location} onChange={e=>setNv(p=>({...p,current_location:e.target.value}))} placeholder="London (EGLF)"/></div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={addVehicle} style={{background:T.gold,color:"#0A0C14",border:"none",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Add to Fleet</button>
                <button onClick={()=>setSF(false)} style={{background:"transparent",color:T.cream,border:`1px solid ${T.bd}`,borderRadius:8,padding:"10px 18px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              </div>
            </div>
          )}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"1rem"}}>
            {fleetLocal.map(v=>(
              <div key={v.id} style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:12,padding:"1.25rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.75rem"}}>
                  <div><span style={{fontSize:10,padding:"3px 8px",borderRadius:20,background:`${TYPE_META[v.type]?.color||T.gold}20`,color:TYPE_META[v.type]?.color||T.gold,fontWeight:700,textTransform:"uppercase"}}>{TYPE_META[v.type]?.label||v.type}</span>
                  <div style={{fontSize:15,fontWeight:800,color:T.cream,marginTop:6}}>{v.model}</div></div>
                  <span style={{fontSize:26,color:TYPE_META[v.type]?.color}}>{TYPE_META[v.type]?.icon}</span>
                </div>
                <div style={{fontSize:12,color:T.muted,marginBottom:"0.5rem"}}>📍 {v.current_location}</div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13}}><span style={{color:T.muted}}>{v.passenger_capacity} pax</span><span style={{color:T.gold,fontWeight:800}}>{fmt(v.price_per_hour)}/hr</span></div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
