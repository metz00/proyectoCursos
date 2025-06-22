const express = require("express");
const router = express();

const CategoryService = require("../services/categoryServices");
const categoryService = new CategoryService();

const validatorHandler = require("../middlewares/validation");
const { checkRoles } = require("../middlewares/auth");

const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema
} = require("../schemas/categorySchema");

router.get("/", async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const result = await categoryService.getCategories(limit, offset);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkRoles(["admin"]),
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const newCategory = await categoryService.create(req.body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  "/:id",
  checkRoles(["admin"]),
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const updated = await categoryService.update(req.params.id, req.body);
      res.json(updated);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  checkRoles(["admin"]),
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const result = await categoryService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;