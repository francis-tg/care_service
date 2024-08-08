'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Board, { foreignKey: 'userId', as: 'boards' });
      this.belongsToMany(models.Board, { through: 'BoardMember', as: 'userboards', foreignKey: 'userId' });
      this.belongsToMany(models.Role, { through: 'UserRole', as: 'roles', foreignKey: 'userId' });
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastname:DataTypes.STRING,
    contact:DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });
  return User;
};