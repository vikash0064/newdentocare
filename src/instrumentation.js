export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const siteUrl = process.env.RENDER_EXTERNAL_URL || process.env.NEXT_PUBLIC_API_URL || 'https://newdentocare.onrender.com';
    const pingUrl = `${siteUrl.replace(/\/$/, '')}/api/health`;
    
    // Render free tier sleeps after 15 minutes of inactivity.
    // Ping every 10 minutes (600,000 ms) while the server is active.
    const INTERVAL_MS = 10 * 60 * 1000;

    console.log(`[Keep-Alive] Started internal self-pinger target: ${pingUrl} (every 10m)`);

    setInterval(async () => {
      try {
        const res = await fetch(pingUrl, {
          headers: { 'User-Agent': 'Render-KeepAlive/1.0' },
          cache: 'no-store'
        });
        if (res.ok) {
          console.log(`[Keep-Alive] Ping successful: ${res.status}`);
        } else {
          console.warn(`[Keep-Alive] Ping returned status: ${res.status}`);
        }
      } catch (err) {
        console.warn(`[Keep-Alive] Ping error: ${err.message}`);
      }
    }, INTERVAL_MS);
  }
}
