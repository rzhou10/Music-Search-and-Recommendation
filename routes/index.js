const userRoute = require("./user");
const songsRoute = require("./songs");

const constructorMethod = app => {
  app.use("/user", userRoute);
  app.use("/songs", songsRoute);

  app.use("*", (req, res) => {
    res.redirect("/user");
  });
};

module.exports = constructorMethod;