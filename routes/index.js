const userRoute = require("./user");
const songsRoute = require("./songs");
const loginRoute = require('./login');
const registrationRoute = require('./registration');

const constructorMethod = (app) => {
  app.use('/', songsRoute);
  app.use("/user", userRoute);
  app.use("/songs", songsRoute);
  app.use('/login', loginRoute);
  app.use('/registration', registrationRoute);
  app.use('*', (req, res) => {
    res.status(404).json({error: "Route not found."});
  });
};

module.exports = constructorMethod;