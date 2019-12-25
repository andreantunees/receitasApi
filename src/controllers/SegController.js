const User = require('../models/User');
const Joi = require('@hapi/joi');
const Jwt = require('jsonwebtoken');

module.exports = {

    async _auth (req, res) {
        const token = req.header('auth-token');
        if(!token) return res.status(401).send('Access Denied');
    
        try{
            const verified = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = verified;
        }catch(err){
            res.status(400).send('Invalid Request');
        }
    },

};