const User = require('../models/User');

module.exports = {

    async index (req,res){
        try{

            const users = await User.findAll();
    
            return res.json(users);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },


    async store(req, res) {
        try{

            const { nome, email } = req.body;
    
            const user = await User.create({ nome, email });
    
            return res.json(user);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async updateUser (req, res) {
        try{

            const { nome, dataNasc, email, senha } = req.body;
    
            const hashPassword = null;
    
            if(!senha){
                hashPassword = await generateCrypt(req.body.senha);
            }
    
            const user = await User.update({
                nome : nome,
                email: email,
                senha: hashPassword,
                nascimento: dataNasc
            }, {
                where: {
                    id: req.idUser,
                    registro: true
                }
            });
    
            return res.json(user);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },
};