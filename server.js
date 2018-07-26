const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();

var loggedIn = false;


// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

app.get("/auth", function(req, res){
  res.json(loggedIn);
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.post("/login", function(req, res){
  if(req.body.username === "axel" && req.body.password === "dragon123"){
    loggedIn = true;
  }
  res.json(loggedIn);
})

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
