//Imports
const express = require("express");
const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer")

const app = express();
var mongoose = require("mongoose");
var server = app.listen(1337);

//Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public/dist/public"));
app.use(bodyParser.json());

//Database
mongoose.connect("mongodb://localhost/portfolio");
require("./server/config/mongoose.js");

//Routes
require("./server/config/routes.js")(app);
