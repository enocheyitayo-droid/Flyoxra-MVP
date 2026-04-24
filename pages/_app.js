import "../styles/globals.css";
import { useState, createContext, useContext } from "react";

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null); // selected vehicle
  const [toast, setToast] = useState(null);
  const showToast = (msg, type="ok") => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  return (
    <Ctx.Provider value={{ user, setUser, cart, setCart, showToast }}>
      <Component {...pageProps} />
      {toast && (
        <div style={{
          position:"fixed", bottom:24, right:24, zIndex:9999,
          background: toast.type==="err" ? "#1E0808" : "#081A10",
          border: `1px solid ${toast.type==="err"?"#C0392B88":"#27AE7A88"}`,
          borderRadius:10, padding:"12px 20px", color:"#ECE8DF", fontSize:13,
          maxWidth:320, fontFamily:"'Helvetica Neue',Arial,sans-serif",
        }}>{toast.msg}</div>
      )}
    </Ctx.Provider>
  );
}
