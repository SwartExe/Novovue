// Structure du proxy Vercel
// Tu vas pouvoir taper : https://novovue.vercel.app/https://frembed.cc/...

// /api/index.js
export default async function handler(req, res) {
  let rawUrl = req.url.slice(5); // Supprime '/api/'

  if (!rawUrl.startsWith('http')) {
    return res.status(400).send('URL invalide');
  }

  // Liste de proxys publics HTTP (attention, instabilité possible)
  const proxyList = [
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy/?quest=' // Ne supporte pas tout
  ];

  let success = false;
  for (const base of proxyList) {
    try {
      const response = await fetch(base + encodeURIComponent(rawUrl), {
        headers: {
          'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
        }
      });
      const contentType = response.headers.get('content-type') || 'text/html';
      const text = await response.text();
      res.setHeader('Content-Type', contentType);
      res.status(200).send(text);
      success = true;
      break;
    } catch (e) {
      continue;
    }
  }

  if (!success) {
    res.status(502).send('Impossible de charger la ressource via les proxies.');
  }
}

// Tu ajoutes un fichier vercel.json pour router tout ce qui est en / vers /api
// vercel.json
/*
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/$1"
    }
  ]
}
*/
