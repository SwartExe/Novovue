export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).send('URL manquante ou invalide.');
  }

  // 🔁 Redirection directe vers Frembed si c’est un player
  if (url.includes('frembed.cc/api/film.php') || url.includes('frembed.cc/api/serie.php')) {
    res.writeHead(302, { Location: url });
    return res.end();
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

    // Si ce n’est pas du HTML, on renvoie tel quel (images, JS, CSS, etc.)
    if (!contentType.includes('text/html')) {
      const buffer = await response.arrayBuffer();
      return res.send(Buffer.from(buffer));
    }

    const body = await response.text();

    // 🔧 Réécriture des liens relatifs dans HTML (src et href)
    const base = new URL(targetUrl).origin;
    const rewritten = body.replace(/(src|href)=["'](\/[^"']+)["']/g, (match, attr, path) => {
      const proxied = `/api/index?url=${encodeURIComponent(base + path)}`;
      return `${attr}="${proxied}"`;
    });

    res.status(200).send(rewritten);
  } catch (e) {
    console.error('Erreur proxy:', e);
    res.status(500).send('Erreur de chargement via proxy.');
  }
}
