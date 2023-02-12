const nameRegex = /^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+([-'\s][A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+)*$/;
const telRegex = /^\d{10}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateNom = (nom) => {
  if (!nom || !nameRegex.test(nom)) {
    return [
      { msg: "Name is required and must be at least 2 characters long." },
    ];
  }
  return [];
};

const validateTel = (tel) => {
  if (!tel || !telRegex.test(tel)) {
    return [
      { msg: "Telephone number is required and must be 10 digits long." },
    ];
  }
  return [];
};

const validateEmail = (email) => {
  if (!email || !emailRegex.test(email)) {
    return [{ msg: "Email is required and must be a valid email address." }];
  }
  return [];
};

const validatePassword = (motDePasse) => {
  if (!motDePasse || motDePasse.length < 8) {
    return [
      { msg: "Password is required and must be at least 8 characters long." },
    ];
  }
  return [];
};

module.exports = { validateEmail, validateNom, validatePassword, validateTel };
