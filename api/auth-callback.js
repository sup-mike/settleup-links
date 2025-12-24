// api/auth-callback.js

export default function handler(req, res) {
  // Get the full query string including hash
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const deepLink = 'settleup://app.settleup.pro/auth/callback' + queryString;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Redirecting to SettleUp...</title>
    </head>
    <body>
      <script>
        // Immediately redirect to the deep link
        // ASWebAuthenticationSession detects this and closes automatically
        window.location.href = "${deepLink}";
      </script>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
