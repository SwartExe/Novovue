import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id parameter' });

  const filePath = path.join(process.cwd(), 'uqload_data.json');

  let data;
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(rawData);
  } catch (err) {
    return res.status(500).json({ error: 'Erreur de lecture JSON' });
  }

  // 🎯 Traitement pour série : id-ssaison-eepisode
  if (/^\d+-s\d+-e\d+$/.test(id)) {
    const match = data.find(entry => entry.tmdb_id === id);
    if (match) return res.status(200).json({ link: match.uqload });
    return res.status(404).json({ error: "Aucun lien série trouvé pour cet ID" });
  }

  // 🎯 Traitement pour film : juste un ID numérique
  if (/^\d+$/.test(id)) {
    const match = data.find(entry => entry.tmdb_id === id);
    if (match) return res.status(200).json({ link: match.uqload });
    return res.status(404).json({ error: "Aucun lien film trouvé pour cet ID" });
  }

  return res.status(400).json({ error: "Format d'ID invalide" });
}
