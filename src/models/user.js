'use strict';
const {
  Model
} = require('sequelize');
const { hasOne } = require('sequelize/lib/model');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.hasOne(models.Address, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.Post, {
        foreignKey: 'user_id'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    avatar_id:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at', // Custom name for createdAt
    updatedAt: 'updated_at', // Custom name for updatedAt
  });
  return User;
};