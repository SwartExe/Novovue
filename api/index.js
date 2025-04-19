export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).send('URL manquante ou invalide.');
  }

  try {
    const targetUrl = decodeURIComponent(url);

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Referer': targetUrl,
        'Origin': new URL(targetUrl).origin
      }
    });

    const contentType = response.headers.get('content-type') || 'text/html';
    res.setHeader('Content-Type', contentType);

    // Si c’est pas du HTML (image, JS, etc.), on renvoie le binaire
    if (!contentType.includes('text/html')) {
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
    }

    const body = await response.text();

    // Réécriture des src/href relatifs pour passer par le proxy
    const base = new URL(targetUrl).origin;
    const rewritten = body.replace(/(src|href)=["'](\/[^"']+)["']/g, (match, attr, path) => {
      const full = new URL(path, base).href;
      return `${attr}="/api/index?url=${encodeURIComponent(full)}"`;
    });

    res.status(200).send(rewritten);
  } catch (e) {
    console.error('Erreur proxy:', e);
    res.status(500).send('Erreur de chargement via proxy.');
  }
}
