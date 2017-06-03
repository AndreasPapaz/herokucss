// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var path = require("path");
// require passport 
var passport = require("./config/passport");
//express session login, similar to firebase sessions
var session = require("express-session");
// Requireing to sync our sequelize models to the database
var db = require("./models");
//Set up for Express server/app
var app = express();
// var PORT = process.env.PORT || 3000;
app.set("port", (process.env.PORT || 3000));


//set up for the express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use("/static", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "/public")));
// app.use(express.static(process.cwd() + "/public"));


// set up for passport test
app.use(session({ secret: "Money Chirp", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main", }));
app.set("view engine", "handlebars");


// Routes
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/company-api-routes.js")(app);
require("./routes/Twitter-api-routes.js")(app);
require("./routes/barchart-api-routes.js")(app);

// set up to sync the sequelize models and start the express server/app
// force: false to maintain all data. true for testing.
//test

var PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, function(){
		console.log('Server successfully connected on PORT %s', PORT);
	});
});
