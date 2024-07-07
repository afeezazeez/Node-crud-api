'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
   
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  }
  Address.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    createdAt: 'created_at', // Custom name for createdAt
    updatedAt: 'updated_at', // Custom name for updatedAt
  });
  return Address;
};