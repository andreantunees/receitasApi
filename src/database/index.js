const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Posts = require('../models/Posts');
const Medidas = require('../models/Medidas');
const Ingredients = require('../models/Ingredients');
const PostsComplete = require('../models/PostsComplete');
const PostsLikeUser = require('../models/PostsLikeUser');
const BlackList = require('../models/BlackList');
const SearchPost = require('../models/SearchPost');

const connection = new Sequelize(dbConfig);

const db = {};

User.init(connection);
Posts.init(connection);
Medidas.init(connection);
Ingredients.init(connection);
PostsComplete.init(connection);
PostsLikeUser.init(connection);
BlackList.init(connection);
SearchPost.init(connection);

Posts.associate(connection.models);
User.associate(connection.models);
Medidas.associate(connection.models);
Ingredients.associate(connection.models);
PostsComplete.associate(connection.models);
PostsLikeUser.associate(connection.models);
BlackList.associate(connection.models);
SearchPost.associate(connection.models);

db.Sequelize = Sequelize;
db.sequelize = connection;

module.exports = db;