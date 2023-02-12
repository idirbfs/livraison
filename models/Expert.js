const mongoose = require("mongoose");

const ExpertSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  motDePasse: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("expert", ExpertSchema);
