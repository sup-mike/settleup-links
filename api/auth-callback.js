// api/auth-callback.js

export default function handler(req, res) {
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
        
        // Use the same format as Stripe deep links
        const deepLink = 'settleup://app.settleup.pro/auth/callback' + params;
        
        // Use anchor click method (works better in some browsers)
        const link = document.createElement('a');
        link.href = deepLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Fallback to web app after 2 seconds
        setTimeout(() => {
          window.location.href = 'https://app.settleup.pro/auth/callback' + params;
        }, 2000);
      </script>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
