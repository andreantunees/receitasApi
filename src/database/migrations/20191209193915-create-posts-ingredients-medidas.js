'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts_Ingredients_Medidas', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ingredients_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ingredients',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      medidas_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medidas',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ingrediente_desc:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      medida_desc:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      qtd_ingred:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Posts_Ingredients_Medidas');
  }
};
