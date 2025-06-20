const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");
const { cloudinary } = require("../libs/cloudinary");

class CourseServices {
  constructor() {
    this.model = models.Courses;
  }

  async getIdCategory(id) {
    const course = await this.model.findByPk(id);
    if (!course) {
      throw boom.notFound("Course not found");
    }
    return { data: course };
  }

  async getCategories() {
    const courses = await this.model.findAll({
      include: ["category"],
    });
    return courses;
  }

  async create(courseData) {
    const newCourse = await this.model.create(courseData);
    return { created: true, data: newCourse };
  }

  async update(id, changes) {
    const course = await this.model.findByPk(id);
    if (!course) {
      throw boom.notFound("Course not found");
    }
    const updated = await course.update(changes);
    return { update: true, data: updated };
  }

  async delete(id) {
    const course = await this.model.findByPk(id);
    if (!course) {
      throw boom.notFound("Course not found");
    }
    if (course.imageId) {
      await cloudinary.uploader.destroy(course.imageId);
    }
    await course.destroy();
    return { message: "Course deleted successfully" };
  }
}

module.exports = CourseServices;
