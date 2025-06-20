'use strict';
const {USER_TABLE,UserSchema} = require('../models/usersModel');
const { CATEGORIES_TABLE, CategoriesSchema } = require('../models/categories')
const { COURSES_TABLE, CoursesSchema } = require('../models/courses');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE,UserSchema);
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(COURSES_TABLE, CoursesSchema);
  },
  
  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE,UserSchema);
    await queryInterface.dropTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.dropTable(COURSES_TABLE, CoursesSchema );
  }
};
