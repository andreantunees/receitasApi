const Post = require('../models/Posts');
const User = require('../models/User');
const PostsComplete = require('../models/PostsComplete');
const sequelize = require('sequelize');
const PostLikeUser = require('../models/PostsLikeUser');


module.exports = {

    async store(req, res) {
        try{
            const { user_id } = req.params;
            const {  titulo, preparo, ingredients } = req.body;
    
            const user = await User.findByPk(user_id);
            if(!user) return res.status(400).json({ error: 'Usuario nao encontrado!'});
    
            const post = await Post.create({
                titulo,
                preparo,
                user_id,
                curtidas: 0,
            });
            
            const post_id = post.dataValues.id;
            
            ingredients.forEach(async data => {
                
                await PostsComplete.create({
                    post_id,
                    ingredients_id: data.ingred,
                    medidas_id: data.med,
                    ingrediente_desc: data.ingredDesc,
                    medida_desc: data.medDesc,
                    qtd_ingred: data.qtd
                });
            });
    
            return res.json({ sucess : "Post inserido com sucesso!" });

        }catch(err){
            return res.status(400).json({ error : "Ocorreu erro inexperado!"})
        } 
    },

    async index(req, res){

        const { post_id } = req.params;

        const post = await PostsComplete.findAll({
            attributes: ['ingrediente_desc','medida_desc','qtd_ingred'],
            where: {
                post_id
            }
        });

        return res.json(post);
    },

    async like (req,res) {
        
        const { user_id } = req.params;
        const { post_id } = req.body;

        const user = await User.findByPk(user_id);
        if(!user) return res.status(400).json({ error: 'Usuario nao encontrado!'});

        const likeExists = await PostLikeUser.findOne({ where: { user_id, post_id }});
        if(likeExists) return res.status(400).json({ error: 'Like ja inserido.'})

        await Post.update({ 
            curtidas: sequelize.literal('curtidas + 1') 
        },{ 
            where: { id: post_id },
        });

        await PostLikeUser.create({
            post_id,
            user_id
        });

        return res.json({ sucess: "Like inserido com sucesso!" });
    },

    async indexByLike (req, res) {
        const { user_id, page } = req.params;

        const pageSize = process.env.LIMIT_PAGE;

        const offset = page * pageSize;
        const limit = pageSize;

        const post = await PostLikeUser.findAll({
            limit,
            offset,
            attributes: ['post_id','createdAt'],
            where: {
                user_id
            },
            include: [{
                association : 'post',
                attributes: ['titulo','preparo','curtidas','createdAt'],
                include: [{
                    association: 'owner',
                    attributes: ['nome','sobrenome'],
                }]
            }]
        });

        return res.json(post);
    },

    async remove (req, res){
        // const { user_id } = req.params;
        // const { post_id } = req.body;

        
    },

    async indexList (req, res){
        //listar post de acordo com os ingredientes/medida/quantidade

        const { user_id, page } = req.params;

        const offset = page * pageSize;
        const limit = pageSize;

        // const post = await PostLikeUser.findAll({
        //     limit,
        //     offset,
        //     attributes: ['post_id','createdAt'],
        //     where: {
        //         user_id
        //     },
        //     include: [{
        //         association : 'post',
        //         attributes: ['titulo','preparo','curtidas','createdAt'],
        //         include: [{
        //             association: 'owner',
        //             attributes: ['nome','sobrenome'],
        //         }]
        //     }]
        // });

        return res.json(post);
    },
};