'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board' });
      this.hasMany(models.Card, { foreignKey: 'listId', as: 'cards' });
    }
  }
  List.init({
    name: DataTypes.STRING,
    boardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};