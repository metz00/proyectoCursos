const Joi = require('joi');

const id = Joi.string().uuid();
const course = Joi.string().trim().min(1);
const categoryId = Joi.string().uuid();
const image = Joi.string().uri();
const imageId = Joi.string();
const description = Joi.string().min(10);
const active = Joi.boolean();

const createCourseSchema = Joi.object({
  course: course.required(),
  categoryId: categoryId.required(),
  image: image.required(),
  imageId: imageId.required(),
  description: description.required(),
  active: active.required()
});


const updateCourseSchema = Joi.object({
  course: course,
  categoryId: categoryId,
  image: image,
  imageId: imageId,
  description: description,
  active: active,
});

const getCourseSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
  getCourseSchema
};
