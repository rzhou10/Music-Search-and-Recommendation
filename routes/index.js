const songsRoute = require("./songs");
const loginRoute = require("./login");
const registrationRoute = require("./registration");
const accountRoute = require("./account");
const songdetailsRoute = require("./songdetails");


const constructorMethod = (app) => {
  app.use('/', songsRoute);
  app.use('/login', loginRoute);
  app.use('/account', accountRoute);
  app.use('/registration', registrationRoute);
  app.use('/songdetails', songdetailsRoute);
  app.use('*', (req, res) => {
    res.status(404).json({error: "Route not found."});
  });
};

module.exports = constructorMethod;