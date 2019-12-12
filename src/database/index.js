const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Posts = require('../models/Posts');
const Medidas = require('../models/Medidas');
const Ingredients = require('../models/Ingredients');
const PostsComplete = require('../models/PostsComplete');

const connection = new Sequelize(dbConfig);

User.init(connection);
Posts.init(connection);
Medidas.init(connection);
Ingredients.init(connection);
PostsComplete.init(connection);

Posts.associate(connection.models);
User.associate(connection.models);
Medidas.associate(connection.models);
Ingredients.associate(connection.models);
PostsComplete.associate(connection.models);

module.exports = connection;