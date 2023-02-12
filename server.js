const express = require("express");
const connectDB = require("./config/db");
const config = require("config");
const session = require("express-session");
const mongoDBSession = require("connect-mongodb-session")(session);

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: true }));

//session handling
const store = new mongoDBSession({
  uri: config.get("mongoURI"),
  collection: "sessions",
});
app.use(
  session({
    secret: config.get("sessionSecret"),
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

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
app.use("/api/expert", require("./routes/expert"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`App is live on port ${PORT}`));
