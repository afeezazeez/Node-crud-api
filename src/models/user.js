'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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