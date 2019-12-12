'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      preparo:{
        type: Sequelize.STRING,
        allowNull: false
      },
      curtidas:{
        type: Sequelize.INTEGER,
        default: 0,
      },
      registro:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
