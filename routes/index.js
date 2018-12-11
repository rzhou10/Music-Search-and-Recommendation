const userRoute = require("./user");
const songsRoute = require("./songs");
const loginRoute = require("./login");
const registrationRoute = require("./registration");
const accountRoute = require("./account");

const constructorMethod = (app) => {
  app.use('/', songsRoute);
  app.use('/user', userRoute);
  app.use('/login', loginRoute);
  app.use('/registration', registrationRoute);
  app.use('/account', accountRoute);
  app.use('*', (req, res) => {
    res.status(404).json({error: "Route not found."});
  });
};

module.exports = constructorMethod;