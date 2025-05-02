import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID manquant' });

  const filePath = path.join(process.cwd(), 'data', 'Flink_data.json');
  if (!fs.existsSync(filePath)) return res.status(500).json({ error: 'Fichier JSON manquant' });

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const match = data.find(film => String(film.tmdb_id) === String(id));

  if (!match) return res.status(404).json({ error: 'Aucun lien trouvé' });

  res.status(200).json({ link: match.uqload });
}
