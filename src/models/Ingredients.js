const { Model, DataTypes } = require('sequelize');

class Ingredients extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.belongsToMany(models.Posts, { foreignKey: 'ingredients_id', through: 'Posts_Ingredients_Medidas', as: 'posts' });
        this.belongsToMany(models.Medidas, { foreignKey: 'ingredients_id', through: 'Posts_Ingredients_Medidas', as: 'medidas' });
    }
}

module.exports = Ingredients;