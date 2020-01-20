const routes = require('express').Router();

//auth
const { auth } = require('../middleware');

//controllers
const UserController = require('../controllers/UserController');
const PostsController = require('../controllers/PostController');
const IngredientesController = require('../controllers/IngredientsController');
const MedidasController = require('../controllers/MedidasController');
const SegController = require('../controllers/SegController');

//seg
routes.post('/register', SegController.register);
routes.post('/login', SegController.login);
routes.post('/logout', auth, SegController.logout);

//users
routes.get('/users', auth, UserController.index);
routes.put('/users/senha', auth, UserController.updateUserSenha);
routes.put('/users/geral', auth, UserController.updateUser);

//posts
routes.post('/posts', auth, PostsController.store);
routes.get('/posts/:post_id', auth, PostsController.index);
routes.get('/posts/like/historico/:page', auth, PostsController.indexByLike);
routes.put('/posts/delete/:post_id', auth, PostsController.remove);
routes.post('/posts/like', auth, PostsController.like);
routes.post('/posts/check/:page', auth, PostsController.indexList);

//ingredientes
routes.post('/ingredientes/cadastro', auth, IngredientesController.store);
routes.get('/ingredientes', auth, IngredientesController.index);
routes.get('/ingredientes/:ing', auth, IngredientesController.indexList);

//medidas
routes.post('/medidas/cadastro', auth, MedidasController.store);
routes.get('/medidas', auth, MedidasController.index);
routes.get('/medidas/:med', auth, MedidasController.indexList);

//test
routes.get('/', (req, res) => res.json({ Atv: "Online" }));

module.exports = routes;