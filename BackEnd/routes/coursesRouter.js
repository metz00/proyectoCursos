const express = require("express");
const router = express();

const CourseService = require("../services/courseServices");
const courseService = new CourseService();

const validatorHandler = require("../middlewares/validation");
const { checkRoles } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const {
  createCourseSchema,
  updateCourseSchema,
  getCourseSchema,
} = require("../schemas/courseSchema");

router.get("/", async (req, res, next) => {
  try {

   const page = parseInt(req.query.page);
   const limit = parseInt(req.query.limit)
    const courses = await courseService.getCourses({ page, limit });
    res.json(courses);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCourseSchema, "params"),
  async (req, res, next) => {
    try {
      const course = await courseService.getIdCourses(req.params.id);
      res.json(course);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  checkRoles(["admin"]),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const body = req.body;

      const courseData = {
        course: body.course,
        categoryId: body.categoryId,
        description: body.description,
        image: req.file.path,
        imageId: req.file.filename,
        active: body.active,
      };

      const newCourse = await courseService.create(courseData);
      res.status(201).json(newCourse);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  "/:id",
  checkRoles(["admin"]),
  validatorHandler(getCourseSchema, "params"),
  validatorHandler(updateCourseSchema, "body"),
  upload.single("image"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updates = {
         course: body.course,
        categoryId: body.categoryId,
        description: body.description,
        active: body.active,
      };

      if (req.file) {
        updates.image = req.file.path;
        updates.imageId = req.file.filename;
      }

     const result = await courseService.update(id, updates);
      res.json(result);
      console.log("Curso Actualizao")
    } catch (error) {
      next(error);
    }
  },
);
router.delete(
  "/:id",
  checkRoles(["admin"]),
  validatorHandler(getCourseSchema, "params"),
  async (req, res, next) => {
    try {
      const result = await courseService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
