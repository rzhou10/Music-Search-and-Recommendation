const userRoute = require("./user");
const songsRoute = require("./songs");
const loginRoute = require('./login');

const constructorMethod = app => {
  app.use("/user", userRoute);
  app.use("/songs", songsRoute);
  app.use('/login', loginRoute);

  app.use("*", (req, res) => {
    res.redirect("/user");
  });
};

module.exports = constructorMethod;