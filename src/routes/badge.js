const { Router } = require("express");
const router = Router();

// db
const { badges } = require("../db.json");

// get data
router.get("/", (req, res) => {
	res.json(badges);
});

// get one data
router.get("/:id", (req, res) => {
	const { id } = req.params;

	if (id) {
		let oneBadge = undefined;

		badges.forEach((badge) => {
			if (badge.id == id) {
				oneBadge = {
					id: badge.id,
					firstName: badge.firstName,
					lastName: badge.lastName,
					email: badge.email,
					jobTitle: badge.jobTitle,
					twitter: badge.twitter,
					avatarUrl: badge.avatarUrl,
				};
			}
		});

		res.json(oneBadge);
	} else {
		res.status(500).json({ error: `Id don't exist` });
	}
});

// set data
router.post("/", (req, res) => {
	const { firstName, lastName, email, jobTitle, twitter, avatarUrl } = req.body;

	if (firstName && lastName && email && jobTitle && twitter && avatarUrl) {
		const id = badges.length + 1;
		const newBadge = { id, ...req.body };

		badges.push(newBadge);
		res.json(badges);
	} else if (!firstName || !lastName || !email || !jobTitle || !twitter || !avatarUrl) {
		res.status(400).json({ error: "There's missing data" });
	} else {
		res.status(500).json({ error: "Something went wrong" });
	}
});

// update data
router.put("/:id", (req, res) => {
	const { id } = req.params;
	const { firstName, lastName, email, jobTitle, twitter, avatarUrl } = req.body;

	if (firstName && lastName && email && jobTitle && twitter && avatarUrl) {
		badges.forEach((badge) => {
			if (badge.id == id) {
				badge.firstName = firstName;
				badge.lastName = lastName;
				badge.email = email;
				badge.jobTitle = jobTitle;
				badge.twitter = twitter;
				badge.avatarUrl = avatarUrl;
			}
		});

		res.json(badges);
	} else if (!firstName || !lastName || !email || !jobTitle || !twitter || !avatarUrl) {
		res.status(400).json({ error: "There's missing data" });
	} else {
		res.status(500).json({ error: "There was an error" });
	}
});

// delete data
router.delete("/:id", (req, res) => {
	const { id } = req.params;

	badges.forEach((badge, i) => {
		if (badge.id == id) {
			badges.splice(i, 1);
		}
	});

	res.send("Deleted Successfully");
});

module.exports = router;

// HTTP Response Codes
// Respuestas informativas (100–199),
// Respuestas satisfactorias (200–299),
// Redirecciones (300–399),
// Errores de los clientes (400–499),
// y errores de los servidores (500–599).
