const { Model, DataTypes } = require('sequelize');

class PostsComplete extends Model {
    static init (sequelize) {
        super.init({
            medida_desc: DataTypes.STRING,
            qtd_ingred: DataTypes.INTEGER,
            ingrediente_desc: DataTypes.STRING,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'Posts_Ingredients_Medidas'
        })
    }

    static associate(models){
        this.belongsTo(models.Ingredients, { foreignKey: 'ingredients_id', as: 'ingrediente' });
        this.belongsTo(models.Medidas, { foreignKey: 'medidas_id', as: 'medida' });
        this.belongsTo(models.Posts, { foreignKey: 'post_id', as: 'post' });
    }
}

module.exports = PostsComplete;