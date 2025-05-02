const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  try {
    const filePath = path.join(__dirname, 'uqload.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);

    const match = data.find(item => item.tmdb_id === id);

    if (match) {
      res.status(200).json({ link: match.uqload });
    } else {
      res.status(404).json({ error: 'Lien non trouvé' });
    }
  } catch (err) {
    console.error('Erreur API :', err.message);
    res.status(500).json({ error: 'Erreur serveur : ' + err.message });
  }
};
