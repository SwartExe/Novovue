import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "Missing ID" });

  try {
    const filePath = path.join(process.cwd(), 'api', 'uqload.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const match = data.find(item => item.tmdb_id === id);

    if (match) {
      return res.status(200).json({ link: match.uqload });
    } else {
      return res.status(404).json({ error: "Lien non trouvé" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur : " + error.message });
  }
}
