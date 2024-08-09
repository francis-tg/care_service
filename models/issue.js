'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      });
      this.hasOne(models.Intervention,{
        foreignKey:'issue_id',
        onDelete:"CASCADE"
      })
    }
  }

  Issue.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    location: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Issue',
    hooks: {
      beforeCreate: async (issue, _options) => {
        // Set the start date to the current date
        issue.start = new Date();
        

        // Check if an issue with the same name and description already exists
        const existingIssue = await Issue.findOne({
          where: {
            user_id:issue.user_id,
            name: issue.name,
            description: issue.description
          }
        });

        if (existingIssue) {
          throw new Error('An issue with the same name and description already exists.');
        }
      }
    }
  });

  return Issue;
};
