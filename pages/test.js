export default function Test() {
  return (
    <div style={{ padding: '20px', background: '#0b1326', color: '#e9c176', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>✈️ AERIS Test Page</h1>
      <p>Next.js is working! Server is running successfully.</p>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ marginBottom: '15px' }}>Navigation:</h2>
        <ul>
          <li><a href="/" style={{ color: '#e9c176' }}>Home</a></li>
          <li><a href="/fleet" style={{ color: '#e9c176' }}>Private Jets</a></li>
          <li><a href="/helicopters" style={{ color: '#e9c176' }}>Helicopters</a></li>
          <li><a href="/checkout?vehicle_id=v9" style={{ color: '#e9c176' }}>Air Ambulance</a></li>
        </ul>
      </div>
    </div>
  );
}