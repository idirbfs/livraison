const express = require("express");
const bcrypt = require("bcryptjs");
const { validateEmail, validatePassword } = require("../helper/validator");
const router = express.Router();
const Admin = require("../models/Admin");

router.post("/login", async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const errors = [...validateEmail(email), ...validatePassword(motDePasse)];
    if (errors.length != 0) {
      return res.status(400).json({ errors });
    }

    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(motDePasse, admin.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout success");
});

module.exports = router;
