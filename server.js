const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Its working");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`App is live on port ${PORT}`));
