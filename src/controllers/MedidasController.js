const Medidas = require('../models/Medidas');

module.exports = {

    async index (req,res){
        const medida = await Medidas.findAll();

        return res.json(medida);
    },

    async store(req, res) {
        const { nome, abrev } = req.body;

        const medida = await Medidas.create({ nome, abrev });

        return res.json(medida);
    }  
};