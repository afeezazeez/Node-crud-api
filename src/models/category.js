'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Post, {
        through: 'PostCategory',
        foreignKey: 'category_id',
        otherKey: 'post_id'
      });
    }
  }
  Category.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Custom name for createdAt
    updatedAt: 'updated_at', // Custom name for updatedAt
  });
  return Category;
};