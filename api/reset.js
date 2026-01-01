// api/reset.js
export default function handler(req, res) {
  const queryString = new URLSearchParams(req.query).toString();
  const webUrl = queryString
    ? `https://app.settleup.pro/reset?${queryString}`
    : 'https://app.settleup.pro/reset';
  
  // Note: Hash fragments don't reach the server, they stay in browser
  // FlutterFlow app needs to read window.location.hash on the client
  
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password - SettleUp</title>
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
      text-align: center; 
      padding: 60px 20px; 
      background: #f5f5f7;
    }
    h2 { color: #1d1d1f; margin-bottom: 8px; }
    p { color: #86868b; margin-bottom: 30px; }
    .btn { 
      display: inline-block; 
      padding: 16px 32px; 
      background: #007AFF; 
      color: white; 
      text-decoration: none; 
      border-radius: 12px; 
      font-weight: 600;
      margin: 8px;
    }
    .secondary { background: #e5e5ea; color: #1d1d1f; }
  </style>
</head>
<body>
  <h2>Opening SettleUp...</h2>
  <p>If the app doesn't open automatically:</p>
  <a class="btn" id="appBtn" href="settleup://reset">Open in App</a>
  <br>
  <a class="btn secondary" id="webBtn" href="${webUrl}">Continue in Browser</a>
  <script>
    // Preserve hash fragment for the app/web URLs
    var hash = window.location.hash;
    if (hash) {
      document.getElementById('appBtn').href = 'settleup://reset' + hash;
      document.getElementById('webBtn').href = '${webUrl}' + hash;
    }
    // Auto-try custom scheme after short delay
    setTimeout(function() {
      window.location.href = document.getElementById('appBtn').href;
    }, 300);
    // Fallback to web after 2.5s
    setTimeout(function() {
      window.location.href = document.getElementById('webBtn').href;
    }, 2500);
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  return res.status(200).send(html);
}
