import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID manquant' });

  try {
    const filePath = path.join(process.cwd(), 'api', 'uqload.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    const result = data.find(item => String(item.tmdb_id) === String(id));
    if (!result) return res.status(404).json({ error: 'Lien non trouvé' });

    return res.status(200).json({ link: result.uqload });
  } catch (e) {
    return res.status(500).json({ error: 'Erreur serveur', details: e.message });
  }
}
