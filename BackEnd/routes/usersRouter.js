const express = require("express");
const router = express.Router();
const passport = require("passport");
const userService = require("../services/userServices");
const user = new userService();

const validatorHandler = require("../middlewares/validation");
const { createUserSchema } = require("../schemas/userSchema");
const { checkRoles } = require("../middlewares/auth");
const { models } = require("../libs/sequelize");
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      console.log("Usuario decodificado del token JWT:", req.user);
      const userId = req.user.id;
      const user = await models.Users.findByPk(userId, {
        attributes: ["id", "email", "role", "createdAt"],
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", async (req, res, next) => {
  try {
    res.send(await user.getUsers());
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkRoles(["admin"]),
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      res.status(204).send(await user.create(req.body));
    } catch (error) {
      next(error);
    }
  },
);
router.put(
  "/:id",
  checkRoles(["admin"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = await user.update(id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles(["admin"]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await user.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
