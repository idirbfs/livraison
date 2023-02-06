const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: true }));

//test route
app.get("/", (req, res) => {
  res.send("Its working");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

//defining routes
app.use("/api/client", require("./routes/client"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`App is live on port ${PORT}`));
