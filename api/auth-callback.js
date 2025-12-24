// api/auth-callback.js

export default function handler(req, res) {
  // Get the full query string and hash from the request
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  
  // Build the deep link URL
  const deepLink = 'settleup://app.settleup.pro/auth/callback' + queryString;
  
  // Perform a 302 redirect to the deep link
  // This server-side redirect causes ASWebAuthenticationSession to close automatically
  res.setHeader('Location', deepLink);
  return res.status(302).end();
}
