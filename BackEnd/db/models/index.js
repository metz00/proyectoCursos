const { Users, UserSchema } = require('../models/usersModel')
const { Categories, CategoriesSchema } = require('../models/categories')
const { Courses, CoursesSchema } = require('../models/courses');

function setUpModel(sequelize){ 
    Users.init(UserSchema, Users.config( sequelize )); 
    Categories.init(CategoriesSchema, Categories.config(sequelize));
    Courses.init(CoursesSchema, Courses.config(sequelize));

      Categories.associate(sequelize.models);
      Courses.associate(sequelize.models);

    
}

module.exports = setUpModel;