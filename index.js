
var express = require('express');
var app = express();

var bodyParser = require("body-parser");

var DataStore = require("nedb");


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Load databases
var db = {};
db.user = new DataStore({filename: "./data/user", autoload: true});
db.msg = new DataStore({filename: "./data/message", autoload: true});


// Define routes
userRoutes = require("./routes/user")(express, db);
app.use("/api", userRoutes);

msgRoutes = require("./routes/message")(express, db);
app.use("/api", msgRoutes);

app.get('/', function (req, res) {
  res.redirect("http://www.skalv-studio.fr");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
