const User = require('../models/User');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation, existsUser } = require('./validations/seg');
const { generateCrypt, compareCrypt} = require('../helpers/crypt');

module.exports = {

    async login (req, res) {
        
        const { error } = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const user = await existsUser(req.body);
        if(!user) return res.status(400).send('Email ou Senha incorreto.');

        const validPassword = await compareCrypt(req.body.senha, user.senha);
        if(!validPassword) return res.status(400).send('Email ou Senha incorreto.');

        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_KEY);

        await User.update({
            status: 'Online'
        },{
            where: { id: user.id }
        });

        res.header('auth-token', token).send({bearerToken: token});
    },

    async register (req, res) {
        const { error } = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    
        const userExists = await existsUser(req.body);
        if(userExists) return res.status(400).send('Email already exists');
    
        const hashPassword = await generateCrypt(req.body.senha);
    
        const user = await User.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            senha: hashPassword,
            nascimento: req.body.nascimento
        });
    
        try{
            res.send({user: user._id});
        }catch(err){
            res.status(400).send(err);
        }
    },

    async logout (req, res) {
        // const 
    },
};