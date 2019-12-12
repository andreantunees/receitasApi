const { Model, DataTypes } = require('sequelize');

class Medidas extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            abrev: DataTypes.STRING,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.belongsToMany(models.Ingredients, { foreignKey: 'medidas_id', through: 'Posts_Ingredients_Medidas', as: 'ingredientes' });
        this.belongsToMany(models.Posts, { foreignKey: 'medidas_id', through: 'Posts_Ingredients_Medidas', as: 'posts' });
    }
}

module.exports = Medidas;