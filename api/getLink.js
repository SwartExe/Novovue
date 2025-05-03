const data = [
  {
    "tmdb_id": "207411-s1-e2",
    "uqload": "https://vidzy.org/embed-w2umvwb3ha13.html"
  },
  {
    "tmdb_id": "207411-s1-e3",
    "uqload": "https://vidzy.org/embed-eadj353d3s9j.html"
  },
  {
    "tmdb_id": "207411-s1-e4",
    "uqload": "https://vidzy.org/embed-lfun1awx0d5l.html"
  },
  {
    "tmdb_id": "207411-s1-e5",
    "uqload": "https://vidzy.org/embed-i0ptttzu89ce.html"
  },
  {
    "tmdb_id": "207411-s1-e6",
    "uqload": "https://vidzy.org/embed-d9ypm9mqmm0n.html"
  },
  {
    "tmdb_id": "207411-s1-e7",
    "uqload": "https://vidzy.org/embed-ptyg85l3xjsc.html"
  },
    {
    "tmdb_id": "207411-s1-e8",
    "uqload": "https://jonathansociallike.com/e/5pgiuqnyjeiq"
  },
]

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
