// api/reset.js

export default function handler(req, res) {
  // Get all query parameters and forward them
  const queryString = new URLSearchParams(req.query).toString();
  const redirectUrl = queryString 
    ? `https://app.settleup.pro/reset?${queryString}`
    : 'https://app.settleup.pro/reset';
  
  return res.redirect(307, redirectUrl);
}
