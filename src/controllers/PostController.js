const Post = require('../models/Posts');
const User = require('../models/User');
const PostsComplete = require('../models/PostsComplete');
const sequelize = require('sequelize');
const PostLikeUser = require('../models/PostsLikeUser');
const SearchPost = require('../models/SearchPost');
const db = require('../database/index');

module.exports = {

    async store(req, res) {
        try{
            const user_id = req.idUser
            const {  titulo, preparo, ingredients } = req.body;
    
            const user = await User.findByPk(user_id);
            if(!user) return res.status(400).json({ message: 'Usuario nao encontrado!'});
    
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
    
            return res.json({ message : "Post inserido com sucesso!" });

        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async index(req, res){
        try{
            
            const { post_id } = req.params;
    
            const post = await PostsComplete.findAll({
                attributes: ['ingrediente_desc','medida_desc','qtd_ingred'],
                where: {
                    post_id,
                    registro: true
                }
            });
    
            return res.json(post);
        
        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async like (req,res) {
        try{

            const user_id  = req.idUser;
            const { post_id } = req.body;

            const user = await User.findByPk(user_id);
            if(!user) return res.status(400).json({ message: 'Usuario nao encontrado!'});

            const likeExists = await PostLikeUser.findOne({ where: { user_id, post_id }});
            if(likeExists) return res.status(400).json({ message: 'Like ja inserido.'})

            await Post.update({ 
                curtidas: sequelize.literal('curtidas + 1') 
            },{ 
                where: { 
                    id: post_id,
                    registro: true
                },
            });

            await PostLikeUser.create({
                post_id,
                user_id
            });

            return res.json({ sucess: "Like inserido com sucesso!" });

        }catch(err){
            return res.status(400).send(err);
        } 
    },

    async indexByLike (req, res) {
        try{

            const { page } = req.params;
    
            const pageSize = process.env.LIMIT_PAGE;
    
            const offset = page * pageSize;
            const limit = pageSize;
    
            const post = await PostLikeUser.findAll({
                limit,
                offset,
                attributes: ['post_id','createdAt'],
                where: {
                    user_id: req.idUser,
                    registro: true
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
        }catch(err){
            return res.status(400).send(err);
        }
    },

    async remove (req, res){
        try{

            const { post_id } = req.params;

            await Post.update({ 
                registro: false 
            },{ 
                where: { 
                    id: post_id,
                    user_id : req.idUser,
                    registro: true
                },
            });
    
            return res.json({ message: 'Operacao executada com sucesso.'});

        }catch(err){
            return res.status(400).send(err);
        }
    },

    async indexList (req, res){
       
            const { page } = req.params;
            const { items } = req.body;

            const pageSize = 2;

            const offset = page * pageSize;
            const limit = pageSize;

            var consulta =  `Select "geral".*, (Select "u"."nome" || ' ' || "u"."sobrenome"
                                                from   "User" as "u"
                                                where  "u"."id" = "geral"."user_id") as "Nome",
                                    (select string_agg("))
                             from (Select  "p"."id", "p"."user_id",
                                    "p"."titulo", "p"."preparo",
                                    "p"."curtidas", "p"."created_at"
                            from "Posts" as "p"
                            inner join "Posts_Ingredients_Medidas" as "pcomp"
                                on "pcomp"."post_id" = "p"."id"
                            where 1=1 `;

            items.forEach(data => { // high
                consulta = consulta.concat(`and "pcomp"."ingredients_id" = ${data.id_ingrediente} 
                                            and "pcomp"."medidas_id" = ${data.id_medida}
                                            and "pcomp"."qtd_ingred" = ${data.qtd}  `)
            });

            consulta = consulta.concat(`union 
                                        Select  "p"."id", "p"."user_id",
                                                "p"."titulo", "p"."preparo",
                                                "p"."curtidas", "p"."created_at"
                                        from "Posts" as "p"
                                        inner join "Posts_Ingredients_Medidas" as "pcomp"
                                            on "pcomp"."post_id" = "p"."id"
                                        where 1=1 `);

            var ingredients = '';

            items.forEach((val, key, arr) => { // low
                if(Object.is(arr.length - 1, key))
                    ingredients = ingredients.concat(`${val.id_ingrediente}`);
                else
                    ingredients = ingredients.concat(`${val.id_ingrediente},`);
            });

            consulta = consulta.concat(`and "pcomp"."ingredients_id" in (${ingredients})
                                        ) as "geral"
                                        Group by "geral"."id", "geral"."user_id", 
                                                 "geral"."titulo", "geral"."preparo",
                                                 "geral"."curtidas", "geral"."created_at"`);

            consulta = consulta.concat(` OFFSET ${offset} LIMIT ${limit} `)
            
            const post = await db.sequelize.query(
                consulta,{
                model: Post,
                type: db.sequelize.QueryTypes.SELECT
            });

            await SearchPost.create({
                user_id: req.idUser,
                search: JSON.stringify(items)
            });

            return res.json(post);
        try{
        }catch(err){
            return res.status(400).send(err);
        }
        
    },
};