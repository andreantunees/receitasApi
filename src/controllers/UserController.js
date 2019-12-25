const User = require('../models/User');

module.exports = {

    async index (req,res){
        const users = await User.findAll();

        return res.json(users);
    },


    async store(req, res) {
        const { nome, email } = req.body;

        const user = await User.create({ nome, email });

        return res.json(user);
    },

    async updateUser (req, res) {
        const { nome, dataNasc, email, senha } = req.body;

        if(!senha){
            
        }

        const user = await User.update({
            nome : nome,
            email: email,
            senha: senha,
            nascimento: dataNasc
        })

    },
};