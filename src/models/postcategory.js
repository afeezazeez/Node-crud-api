'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
  
    static associate(models) {
      // define association here
    }
  }
  PostCategory.init({
    post_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'PostCategory',
    tableName: 'post_categories',
    timestamps: false  // Disable timestamps
  });
  return PostCategory;
};