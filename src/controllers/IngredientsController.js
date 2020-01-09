const Ingredientes = require('../models/Ingredients');
const Op = require('sequelize').Op;

module.exports = {

    async index (req,res){
        const ingrediente = await Ingredientes.findAll();

        return res.json(ingrediente);
    },

    async store (req, res) {
        const { nome } = req.body;

        const ingrediente = await Ingredientes.create({ nome });

        return res.json(ingrediente);
    },
    
    async indexList (req, res){
        
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
    },
};