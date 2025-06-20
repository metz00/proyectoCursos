const express = require('express');
const router = express();

const userService = require('../services/userServices');
const user = new userService();

const validatorHandler = require('../middlewares/validation');
const { createUserSchema } = require('../schemas/userSchema');
const { checkRoles } = require('../middlewares/auth');

router.get('/', async (req, res, next ) => {
    try {
        res.send(await user.getUsers())
    } catch (error) {
        next(error);
    }
});

router.post('/',
    checkRoles(['admin']),
    validatorHandler(createUserSchema,'body'), 
    async (req, res, next ) => {
        try {
            res.status(204).send(await user.createUsers(req.body))
        } catch (error) {
            next(error);
        }
});

module.exports = router;