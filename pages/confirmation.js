import { useRouter } from "next/router";
import { bookingsStore, FLEET, OPERATORS } from "../lib/data";
import Link from "next/link";
const T={bg:"#060A14",card:"#0C1220",bd:"#1A2540",gold:"#BF9B54",cream:"#ECE8DF",muted:"#6B7A9C",ok:"#27AE7A",warn:"#E8A020"};
const fmt = n => `$${Number(n).toLocaleString()}`;
const STATUS={confirmed:T.ok,pending:T.warn};
export default function Confirmation() {
  const { query } = useRouter();
  const bk = bookingsStore.find(b => b.id === query.id);
  const v  = bk ? FLEET.find(f => f.id === bk.vehicle_id) : null;
  const op = v  ? OPERATORS[v.operator_id] : null;
  if (!bk) return <div style={{padding:"4rem",textAlign:"center",color:T.muted,background:T.bg,minHeight:"100vh",fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>Booking not found. <Link href="/" style={{color:T.gold}}>Go home</Link></div>;
  return (
    <div style={{minHeight:"100vh",background:T.bg,color:T.cream,fontFamily:"'Helvetica Neue',Arial,sans-serif",padding:"5rem 2rem",maxWidth:560,margin:"0 auto",textAlign:"center"}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:`${T.ok}18`,border:`2px solid ${T.ok}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem",fontSize:24,color:T.ok}}>✓</div>
      <h2 style={{fontSize:28,fontWeight:200,color:T.cream,margin:"0 0 0.5rem"}}>Request Submitted</h2>
      <p style={{color:T.muted,fontSize:14,marginBottom:"2.5rem"}}>Sent to <strong style={{color:T.cream}}>{op?.name}</strong>. Expect confirmation within minutes.</p>
      <div style={{background:T.card,border:`1px solid ${T.bd}`,borderRadius:12,padding:"1.5rem",textAlign:"left",marginBottom:"2rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",paddingBottom:"0.75rem",borderBottom:`1px solid ${T.bd}`,marginBottom:"0.75rem"}}>
          <span style={{fontSize:11,color:T.muted,textTransform:"uppercase",letterSpacing:"0.1em"}}>Booking Ref</span>
          <span style={{color:T.gold,fontFamily:"monospace",fontWeight:700}}>{bk.id}</span>
        </div>
        {[["Aircraft",v?.model],["Route",bk.route||bk.label],["Date",bk.date||"—"],["Duration",`${bk.duration||bk.dur}h`],["Total",fmt(bk.total)],["Status",bk.status]].map(([k,val])=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${T.bd}`,fontSize:13}}>
            <span style={{color:T.muted}}>{k}</span>
            <span style={{color:k==="Status"?STATUS[bk.status]||T.muted:T.cream,fontWeight:k==="Status"||k==="Total"?700:400,textTransform:k==="Status"?"capitalize":"none"}}>{val}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Link href="/dashboard" style={{background:T.gold,color:"#0A0C14",borderRadius:8,padding:"11px 22px",fontSize:13,fontWeight:800,textDecoration:"none"}}>View My Bookings →</Link>
        <Link href="/" style={{background:"transparent",color:T.cream,border:`1px solid ${T.bd}`,borderRadius:8,padding:"11px 22px",fontSize:13,textDecoration:"none"}}>Book Another</Link>
      </div>
    </div>
  );
}
