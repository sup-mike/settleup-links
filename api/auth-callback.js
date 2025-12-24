// api/auth-callback.js

export default function handler(req, res) {
  // Get the full query string (contains access_token, refresh_token, etc.)
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  
  // Build the deep link to your native app
  const deepLink = 'settleup://app.settleup.pro/auth/callback' + queryString;
  
  // IMPORTANT: Use 302 redirect, not HTML/JavaScript
  res.setHeader('Location', deepLink);
  return res.status(302).end();
}
