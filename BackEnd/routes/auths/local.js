const express = require('express');
const passport = require('passport');
const jsonWebToken = require('jsonwebtoken');
const { config } = require('../../config/config');

const UserService = require("../../services/userServices.js");
const service = new UserService();

const router = express.Router();

router.post('/sign-in',
    passport.authenticate('local', {session: false}),
    async (req, res, next) => {
        try {
            const user = req.user;
            const payload = {
            sub: user.id,
            role: user.role,
            // expiresIn: 1000
            }
            const token =  jsonWebToken.sign(payload, config.jwtSecret);
            res.json({
            user,
            token
            });
        } catch (error) {
            next(error);
            
        }
    }
);
router.post('/sign-up',
    async (req, res, next) => {
        try {
            res.send(await service.create(req.body))
        } catch (error) {
            next(error);
            
        }
    }
);

module.exports = router;