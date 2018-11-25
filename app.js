const express = require("express");
const app = express();
let configRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",

    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === "number")
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
  
        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    }
  });
  
  const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    next();
  };

app.use("/public", static);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(rewriteUnsupportedBrowserMethods);
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");

    if (process && process.send){
        process.send({done: true});
    }
});