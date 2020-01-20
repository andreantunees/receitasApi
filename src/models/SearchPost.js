const { Model, DataTypes } = require('sequelize');

class SearchPost extends Model {
    static init (sequelize) {
        super.init({
            search: DataTypes.STRING,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            schema: 'public',
            tableName: 'Search_Post'
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }

}

module.exports = SearchPost;