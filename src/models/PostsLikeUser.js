const { Model, DataTypes } = require('sequelize');

class PostsLikeUser extends Model {
    static init (sequelize) {
        super.init({
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'Curtidas_User_Post'
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Posts, { foreignKey: 'post_id', as: 'post' });
    }
}

module.exports = PostsLikeUser;