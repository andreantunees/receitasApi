const Ingredientes = require('../models/Ingredients');
const Op = require('sequelize').Op;

module.exports = {

    async index (req,res){
        try{

            const ingrediente = await Ingredientes.findAll();
    
            return res.json(ingrediente);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async store (req, res) {

        try{
            
            const { nome } = req.body;

            const ingrediente = await Ingredientes.create({ nome });

            return res.json(ingrediente);

        }catch(err){
            return res.status(400).send(err);
        } 
    },
    
    async indexList (req, res){
        try{

            const { ing } = req.params;
    
            const query = `%${ing}%`
    
            const ingrediente = await Ingredientes.findAll({
                attributes: ['nome'],
                limit: process.env.LIMIT_DROPDOWN,
                where: {
                    nome : { [Op.iLike]: query },
                    registro: true
                },
            });
    
            return res.json(ingrediente);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },
};