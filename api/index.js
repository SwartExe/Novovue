// Tu vas pouvoir taper dans ton navigateur : https://novovue.vercel.app/api?url=...
// Ce proxy ne repose que sur une fonction API, sans rewrite ni fichier statique

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).send('Paramètre "url" invalide');
  }

  const proxyList = [
    'https://thingproxy.freeboard.io/fetch/',
    'https://api.allorigins.win/raw?url=',
    'https://api.codetabs.com/v1/proxy/?quest='
  ];

  for (const base of proxyList) {
    try {
      const proxied = base + encodeURIComponent(url);
      const response = await fetch(proxied, {
        headers: {
          'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
        }
      });

      const contentType = response.headers.get('content-type') || 'text/html';
      const body = await response.text();

      res.setHeader('Content-Type', contentType);
      res.status(200).send(body);
      return;
    } catch (e) {
      // Essayons le proxy suivant
    }
  }

  res.status(502).send('Erreur : aucun proxy n’a réussi à récupérer la ressource.');
}
