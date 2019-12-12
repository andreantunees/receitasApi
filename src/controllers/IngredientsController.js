const Ingredientes = require('../models/Ingredients');

module.exports = {

    async index (req,res){
        const ingrediente = await Ingredientes.findAll();

        return res.json(ingrediente);
    },

    async store(req, res) {
        const { nome } = req.body;

        const ingrediente = await Ingredientes.create({ nome });

        return res.json(ingrediente);
    }  
};