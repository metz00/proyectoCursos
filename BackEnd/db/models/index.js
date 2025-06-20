const { Users, UserSchema } = require('../models/usersModel')

function setUpModel(sequelize){ 
    Users.init(UserSchema, Users.config( sequelize )); 
    
}

module.exports = setUpModel;