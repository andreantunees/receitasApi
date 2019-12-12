const { Model, DataTypes } = require('sequelize');

class Posts extends Model {
    static init (sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            preparo: DataTypes.STRING,
            curtidas: DataTypes.INTEGER,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' });
        this.hasMany(models.PostsComplete, { foreignKey: 'post_id', as: 'postsComplete' });
        this.belongsToMany(models.Ingredients, { foreignKey: 'post_id', through: 'Posts_Ingredients_Medidas', as: 'ingredientes' });
        this.belongsToMany(models.Medidas, { foreignKey: 'post_id', through: 'Posts_Ingredients_Medidas', as: 'medidas' });
        this.belongsToMany(models.User, { foreignKey: 'post_id', through: 'Curtidas_User_Post', as: 'usuarioCurtida' });
    }
}

module.exports = Posts;