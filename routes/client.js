const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Client = require("../models/Client");

router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;
  // TODO : input validation {email, motDePasse}
  // TODO : check credentials
  try {
    let client = await Client.findOne({ email });
    if (!client) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(motDePasse, client.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // TODO : create token
    // TODO : login success

    res.send("login success!!!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { nom, prenom, email, motDePasse, tel } = req.body;
  //todo : check input
  //todo : check the none existence of (email) in db
  try {
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

module.exports = router;
