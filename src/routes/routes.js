const routes = require('express').Router();

//controllers
const UserController = require('../controllers/UserController');
const PostsController = require('../controllers/PostController');
const IngredientesController = require('../controllers/IngredientsController');
const MedidasController = require('../controllers/MedidasController');

//users
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

//posts
routes.post('/users/:user_id/posts', PostsController.store);
routes.get('/users/:user_id/posts/:post_id', PostsController.index);
routes.post('/users/:user_id/posts/like', PostsController.like);

//ingredientes
routes.post('/ingredientes/cadastro', IngredientesController.store);
routes.get('/ingredientes', IngredientesController.index);

//medidas
routes.post('/medidas/cadastro', MedidasController.store);
routes.get('/medidas', MedidasController.index);

module.exports = routes;