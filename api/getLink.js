import data from './uqload_data.js';

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing ID" });

  const match = data.find(item => item.tmdb_id === id);

  if (match) {
    res.status(200).json({ link: match.uqload });
  } else {
    res.status(404).json({ error: "Lien non trouvé" });
  }
}
