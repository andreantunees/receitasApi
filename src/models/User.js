const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init (sequelize) {
        super.init({
            nome: DataTypes.STRING,
            // sobrenome: DataTypes.STRING,
            email: DataTypes.STRING,
            // senha: DataTypes.STRING,
            // nascimento: DataTypes.DATE,
            // status: DataTypes.STRING,
            // registro: DataTypes.BOOLEAN,
        }, {
            sequelize,
            freezeTableName: true
        })
    }

    static associate(models){
        this.hasMany(models.Posts, { foreignKey: 'user_id', as: 'posts' });
        this.belongsToMany(models.Posts, { foreignKey: 'user_id', through: 'Curtidas_User_Post', as: 'postCurtida' });
    }
}

module.exports = User;