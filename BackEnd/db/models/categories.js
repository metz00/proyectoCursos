const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIES_TABLE = 'categories';

const CategoriesSchema = {
  id: {
    allowNull: false,    
    primaryKey: true,
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
};

class Categories extends Model {
  static associate(models) {
    Categories.hasMany(models.Courses, {
      as: 'courses',
      foreignKey: 'categoryId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categories',
      timestamps: false
    };
  }
}

module.exports = { CATEGORIES_TABLE, CategoriesSchema, Categories };