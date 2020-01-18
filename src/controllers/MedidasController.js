const Medidas = require('../models/Medidas');
const Op = require('sequelize').Op;

module.exports = {

    async index (req,res){
        try{

            const medida = await Medidas.findAll();
    
            return res.json(medida);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async store(req, res) {
        try{

            const { nome, abrev } = req.body;
    
            const medida = await Medidas.create({ nome, abrev });
    
            return res.json(medida);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async indexList (req, res){
        try{

            const { med } = req.params;
    
            const query = `%${med}%`
    
            const medida = await Medidas.findAll({
                attributes: ['nome','abrev'],
                limit: process.env.LIMIT_DROPDOWN,
                where: {
                    abrev : { [Op.iLike]: query },
                    registro: true
                },
            });
    
            return res.json(medida);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },
};