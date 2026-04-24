// pages/_app.js  — ADD CurrencyProvider here
import '../styles/globals.css';
import { AuthProvider }     from '../lib/AuthContext';
import { SearchProvider }   from '../lib/SearchContext';
import { CurrencyProvider } from '../lib/CurrencyContext';  // ← ADD THIS

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <CurrencyProvider>                                    {/* ← WRAP HERE */}
          <Component {...pageProps} />
        </CurrencyProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
