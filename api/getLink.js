const data = [
  { tmdb_id: "550", uqload: "https://filemoon.to/e/mn2nu5vaxfio" },
  { tmdb_id: "207411-s1-e1", uqload: "https://filemoon.to/e/mn2nu5vaxfio" }
];

module.exports = (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing ID" });
  }

  const match = data.find(entry => entry.tmdb_id === id);

  if (match) {
    return res.status(200).json({ link: match.uqload });
  } else {
    return res.status(404).json({ error: "Lien non trouvé" });
  }
};
