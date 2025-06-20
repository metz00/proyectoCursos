const express = require("express");
const passport = require("passport");

const userService = require("./usersRouter");
const authRoute = require("./auths");
const courseRouter = require("./coursesRouter");
const categoryRouter = require("./categoriesRouter");



const mainRouter = (app) => {
  app.get("/", async (req, res) => {
  });

  const router = express.Router(); 
  app.use("/api/v1", router);
  router.use("/auths", authRoute);

  router.use(passport.authenticate("jwt", { session: false })); /// PRIV
  router.use("/users", userService);
  router.use("/courses", courseRouter); 
  router.use("/categories", categoryRouter);



};

module.exports = mainRouter;
