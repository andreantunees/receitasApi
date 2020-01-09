const routes = require('express').Router();

//auth
const { auth } = require('../middleware');

//controllers
const UserController = require('../controllers/UserController');
const PostsController = require('../controllers/PostController');
const IngredientesController = require('../controllers/IngredientsController');
const MedidasController = require('../controllers/MedidasController');
const SegController = require('../controllers/SegController');

//users
routes.get('/users', auth,UserController.index);

//posts
routes.post('/users/:user_id/posts', auth, PostsController.store);
routes.get('/users/:user_id/posts/:post_id', auth, PostsController.index);
routes.get('/users/:user_id/posts/like/history/:page', auth, PostsController.indexByLike);
routes.post('/users/:user_id/posts/like', auth, PostsController.like);

//ingredientes
routes.post('/ingredientes/cadastro', auth, IngredientesController.store);
routes.get('/ingredientes', auth, IngredientesController.index);
routes.get('/ingredientes/:ing', auth, IngredientesController.indexList);

//medidas
routes.post('/medidas/cadastro', auth, MedidasController.store);
routes.get('/medidas', auth, MedidasController.index);
routes.get('/medidas/:med', auth, MedidasController.indexList);

//seg
routes.post('/register', SegController.register);
routes.post('/login', SegController.login);

//test
routes.get('/', (req, res) => res.json({ Atv: "Online" }));

module.exports = routes;