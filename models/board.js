'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
      this.hasMany(models.List, { foreignKey: 'boardId', as: 'lists' });
      this.belongsToMany(models.User, { through: 'BoardMember', as: 'members', foreignKey: 'boardId' });
    }
  }
  Board.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};