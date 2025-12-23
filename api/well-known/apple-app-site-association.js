export default function handler(req, res) {
  const aasa = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "724QTT2WG3.pro.settleup.app",
          paths: ["/callback", "/stripe/complete", "/stripe/refresh"]
        }
      ]
    },
    webcredentials: {
      apps: ["724QTT2WG3.pro.settleup.app"]
    }
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(aasa);
}
