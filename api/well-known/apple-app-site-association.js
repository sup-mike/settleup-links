// api/well-known/apple-app-site-association.js
export default function handler(req, res) {
  const aasa = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "724QTT2WG3.pro.settleup.app",
          paths: [
            "/",
            "/stripe/complete",
            "/stripe/refresh",
            "/reset",
            "/login"
          ]
        }
      ]
    },
    webcredentials: {
      apps: ["724QTT2WG3.pro.settleup.app"]
    }
  };
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(aasa);
}
