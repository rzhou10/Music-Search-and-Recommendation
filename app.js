const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

const static = express.static(__dirname + "/public");

const handlebarsInstance = exphbs.create({
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
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

const morgan = require('morgan');
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: "secretKey",
  secure: true,
  httpOnly: true,
  resave: true,
  saveUninitialized: false
}));
app.use(rewriteUnsupportedBrowserMethods);
app.engine("handlebars", handlebarsInstance.engine);
app.set('views', __dirname + '/views');
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");

    if (process && process.send){
        process.send({done: true});
    }
});