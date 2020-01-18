const User = require('../models/User');
const { generateCrypt } = require('../helpers/crypt');

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

    async updateUserSenha (req, res) {
        try{
            const hashPassword = await generateCrypt(req.body.senha);
    
            await User.update({
                senha: hashPassword
            }, {
                where: {
                    id: req.idUser,
                    registro: true
                }
            });
    
            return res.json({ message: 'Dados atualizados!'});
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async updateUser (req, res) {
        try{

            const { nome, sobrenome, email, nascimento } = req.body;
    
            await User.update({
                nome,
                sobrenome,
                email,
                nascimento
            }, {
                where: {
                    id: req.idUser,
                    registro: true
                }
            });
    
            return res.json({ message: 'Dados atualizados!'});
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

};