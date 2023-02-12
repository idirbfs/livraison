const isAdmin = async (req, res, next) => {
  const Admin = require("../models/Admin");
  return (await Admin.findById(req.session.userId))
    ? next()
    : res.status(401).json({ msg: "Authorization denied" });
};

const isClient = async (req, res, next) => {
  const Client = require("../models/Client");
  return (await Client.findById(req.session.userId))
    ? next()
    : res.status(401).json({ msg: "Authorization denied" });
};

const isExpert = async (req, res, next) => {
  const Expert = require("../models/Expert");
  return (await Expert.findById(req.session.userId))
    ? next()
    : res.status(401).json({ msg: "Authorization denied" });
};

module.exports = { isAdmin, isClient, isExpert };
