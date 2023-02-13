const app = require("express");
const Expert = require("../models/Expert");
const {
  validateEmail,
  validateNom,
  validatePassword,
  validateTel,
} = require("../helper/validator");
const { isAdmin, isExpert } = require("../middlewear/auth");

router = app.Router();

//GET:api/expert
router.get("/", isExpert, async (req, res) => {
  try {
    res.json(await Client.findById(req.session.userId));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//POST:api/expert/login:@PUBLIC
router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const errors = [...validateEmail(email), ...validatePassword(motDePasse)];
    if (errors.length != 0) {
      return res.status(400).json({ errors });
    }

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

//POST:api/expert/register:@PRIVATE(admin)
router.post("/register", isAdmin, async (req, res) => {
  const { email, motDePasse, nom, prenom, tel } = req.body;
  try {
    const errors = [
      ...validateEmail(email),
      ...validateNom(nom),
      ...validateNom(prenom),
      ...validatePassword(motDePasse),
      ...validateTel(tel),
    ];
    if (errors.length != 0) {
      return res.status(400).json({ errors });
    }

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
    res.send("expert inseré");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
