const express = require("express");
const path = require("path");
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const bodyParser = require("body-parser");
const session = require("express-session");

const PORT = process.env.PORT || 3001;
const app = express();

const db = require("./models");

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(session({
  secret: "hahahahaha",
  resave: false,
  saveUnitialized: true,
  cookie: {secure: "auto", maxAge: null}
}));

// Define API routes here

const routes = require("./routes/api.js");
app.use(routes); 

// Send every other request to the React app
// Define any API routes before this runs

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

 db.sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => {
     console.log(`🌎 ==> Server now on port ${PORT}!`);
   });
 }); 