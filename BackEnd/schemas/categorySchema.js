const Joi = require('joi');

const id =  Joi.string().uuid();
const category = Joi.string();
const active = Joi.boolean();


const createCategorySchema = Joi.object({
    category: category.required(),
    active: active.required(),
   
});

const updateCategorySchema = Joi.object({
    category: category,
    active: active,
});

const getCategorySchema = Joi.object({
    id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema }