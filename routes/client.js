const express = require("express");
const bcrypt = require("bcryptjs");
const Client = require("../models/Client");
const {
  validateEmail,
  validateNom,
  validatePassword,
  validateTel,
} = require("../helper/validator");

const { isClient, isAdmin, isExpert } = require("../middlewear/auth");

const router = express.Router();

//GET: /api/client/ :@PRIVATE:(client)
router.get("/", isClient, async (req, res) => {
  try {
    res.json(await Client.findById(req.session.userId));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//POST:api/client/login:@PUBLIC
router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    //inputs validations
    let errors = [...validateEmail(email), ...validatePassword(motDePasse)];
    if (errors.length != 0) {
      return res.status(400).json({ errors });
    }

    let client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    req.session.userId = client.id;

    res.send("login success!!! : \n" + client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//POST:api/client/register:@PUBLIC
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { nom, prenom, email, motDePasse, tel } = req.body;

  try {
    const errors = [
      ...validateNom(nom),
      ...validateNom(prenom),
      ...validateEmail(email),
      ...validatePassword(motDePasse),
      ...validateTel(tel),
    ];

    if (errors.length != 0) {
      return res.status(400).json({ errors });
    }

    let client = await Client.findOne({ email });

    if (client) {
      res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }

    client = new Client({ nom, prenom, email, motDePasse, tel });
    const salt = await bcrypt.genSalt(10);
    client.motDePasse = await bcrypt.hash(motDePasse, salt);
    await client.save();
    res.send("Client inseré!!!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//POST:api/client/logout:@PRIVATE(client)
router.post("/logout", isClient, (req, res) => {
  req.session.destroy();
  res.send("logout success");
});

module.exports = router;
