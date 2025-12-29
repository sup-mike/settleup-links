// api/auth-callback.js
export default function handler(req, res) {
  const queryString = new URLSearchParams(req.query).toString();
  const deepLinkUrl = `settleup://app.settleup.pro/auth/callback${queryString ? '?' + queryString : ''}`;
  
  // Detect in-app WebView via User-Agent or query parameter
  const userAgent = req.headers['user-agent'] || '';
  const isInAppWebView = req.query.webview === 'true' || 
                          userAgent.includes('wv') ||  // Android WebView marker
                          (userAgent.includes('Mobile') && !userAgent.includes('Safari'));
  
  if (isInAppWebView) {
    // For in-app WebView: render a page that closes itself
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Login Successful</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              background: #1a1a1a;
              color: white;
            }
            .checkmark { font-size: 64px; margin-bottom: 20px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            p { color: #888; margin-bottom: 30px; }
            button {
              background: #0066FF;
              color: white;
              border: none;
              padding: 16px 32px;
              font-size: 18px;
              border-radius: 8px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="checkmark">✓</div>
          <h1>Login Successful!</h1>
          <p>You can close this window now.</p>
          <button onclick="closeWindow()">Done</button>
          <script>
            // Try to close automatically
            function closeWindow() {
              // For Flutter WebView, sending a message might work
              if (window.flutter_inappwebview) {
                window.flutter_inappwebview.callHandler('closeWebView');
              }
              // Standard close attempt
              window.close();
            }
            // Auto-attempt close after 1 second
            setTimeout(closeWindow, 1000);
          </script>
        </body>
      </html>
    `);
  } else {
    // For external browser (ASWebAuthenticationSession): use 302 redirect
    res.redirect(307, deepLinkUrl);
  }
}
