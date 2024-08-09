'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Intervention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Issue, {
        foreignKey: 'issue_id',
        onDelete: 'CASCADE'
      });
      this.belongsTo(models.User, {
        foreignKey: 'technician_id',
        onDelete: 'CASCADE',
        as: 'technician'
      });
    }
  }

  Intervention.init({
    issue_id: DataTypes.INTEGER,
    technician_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Intervention',
    hooks: {
      beforeCreate: async (intervention, _options) => {
        const existingIntervention = await Intervention.findOne({
          where: {
            issue_id: intervention.issue_id,
            technician_id: intervention.technician_id
          }
        });

        if (existingIntervention) {
          if (process.env.NODE_ENV==='production') {
            throw new Error('Internal error')
          }else{
            throw new Error('Intervention with this issue and technician already exists.');
          }
        }
      }
    }
  });

  return Intervention;
};
