// api/auth-callback.js

export default function handler(req, res) {
  // Get the full URL with hash/query params
  const query = req.url.includes('?') ? req.url.split('?')[1] : '';
  
  // HTML that attempts app deep link, then falls back to web
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Redirecting...</title>
    </head>
    <body>
      <p>Completing sign in...</p>
      <script>
        const params = window.location.search + window.location.hash;
        
        // Try custom scheme for app
        window.location.href = 'settleup://auth/callback' + params;
        
        // Fallback to web app after 2 seconds
        setTimeout(() => {
          window.location.href = 'https://app.settleup.pro' + params;
        }, 2000);
      </script>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
