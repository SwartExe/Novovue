import data from './api/uqload_data.json';

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id parameter' });

  if (/^\d+-s\d+-e\d+$/.test(id)) {
    const match = data.find(entry => entry.tmdb_id === id);
    if (match) return res.status(200).json({ link: match.uqload });
    return res.status(404).json({ error: "Lien série introuvable." });
  }

  if (/^\d+$/.test(id)) {
    const match = data.find(entry => entry.tmdb_id === id);
    if (match) return res.status(200).json({ link: match.uqload });
    return res.status(404).json({ error: "Lien film introuvable." });
  }

  return res.status(400).json({ error: "Format d'ID invalide" });
}
