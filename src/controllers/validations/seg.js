const Joi = require('@hapi/joi');
const User = require('../../models/User');
const BlackList = require('../../models/BlackList');

module.exports = {

    async registerValidation (data) {
        const schema = Joi.object({
        nome: Joi.string().min(3).max(255).required(),
        sobrenome: Joi.string().min(3).max(255).required(),
        email: Joi.string().min(9).max(255).email().required(),
        senha: Joi.string().min(8).max(1024).required(),
        nascimento: Joi.date().required()   
        });
    
        return schema.validate(data);
    },

    async existsUser (data) {
        return await User.findOne({ 
            where: { 
                email: data.email,
                registro: true 
            }
        });
    },

    async loginValidation (data) {
        const schema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().required()
        });
    
        return schema.validate(data);
    },

    async userOnlineByPk (id){
        return await User.findOne({
            where: {
                id,
                status: 'Online',
                registro: true
            }
        });
    },

    async invalidationToken(id, token){
        return await BlackList.create({
            token,
            user_id: id
        });
    },

    async checkTokenBlackList(token){
        return await BlackList.findOne({
            where: {
                token, 
                registro: true
            }
        });
    },
}
