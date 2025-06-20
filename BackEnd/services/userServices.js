const bcrypt =  require('bcrypt');
const { models } = require('../libs/sequelize');

class UserServices {

    constructor(){
        this.table = models.Users
    }

    async getUsers(){
        const listUsers = await this.table.findAll();
        return listUsers; 
    }
    async create(user){
        let data
        if(user.password){
            const hash  = await bcrypt.hash(user.password,10);
            data = await this.table.create({
                ...user,
                password: hash
            })
            delete data.dataValues.password; 
            delete data.dataValues.id; 
        }else{
            data = await this.table.create(user)
        }
        return data
        
    }
    async findByEmail (email){
        const user = await this.table.findOne({
            where: {
                email
            }
        })
        return user;
    }
}

module.exports = UserServices;