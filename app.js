const express = require("express");
const app = express();
let configRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");

    if (process && process.send){
        process.send({done: true});
    }
});