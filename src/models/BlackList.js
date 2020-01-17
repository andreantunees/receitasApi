const { Model, DataTypes } = require('sequelize');

class BlackList extends Model {
    static init (sequelize) {
        super.init({
            token: DataTypes.STRING,
            registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }

}

module.exports = BlackList;