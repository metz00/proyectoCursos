const express = require("express");
const userService = require("./usersRouter");
const passport = require("passport");
const authRoute = require("./auths");

const mainRouter = (app) => {
  app.get("/", async (req, res) => {
      res.send("Te amo Metz");
  });
  const router = express.Router(); // PERMITE PETICIONES HTTP
  app.use("/api/v1", router);
  router.use("/auths", authRoute);

  router.use(passport.authenticate("jwt", { session: false })); ///TOKEN APIS PRIVADAS

  router.use("/users", userService);
};

module.exports = mainRouter;
