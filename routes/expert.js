const app = require("express");
const Expert = require("../models/Expert");

router = app.Router();

router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    // todo validate form input

    let expert = await Expert.findOne({ email });
    if (!expert) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(motDePasse, expert.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/register", async (req, res) => {
  const { email, motDePasse, nom, prenom, tel } = req.body;
  try {
    // todo validate form input

    let expert = await Expert.findOne({ email });
    if (expert) {
      return res
        .status(400)
        .json({ errors: [{ msg: "User allready exists" }] });
    }

    expert = new Expert({ nom, prenom, email, motDePasse, tel });

    const salt = await bcrypt.genSalt(10);
    expert.motDePasse = await bcrypt.hash(motDePasse, salt);
    await expert.save();

    res.send("Client inseré!!!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
