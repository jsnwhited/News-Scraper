var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3003;

var app = express();

var router = express.Router();

app.use(express.static(_dirname + "/public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.listen(PORT, function() {
    console.log("THE PORT IS LISTENING ON " + PORT)
});