const { Model, DataTypes, Sequelize } = require("sequelize");
const { CATEGORIES_TABLE } = require("./categories");

const COURSES_TABLE = "courses";

const CoursesSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: CATEGORIES_TABLE,
      key: "id",
    },
    field: 'category_id'
  },
  course: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Courses extends Model {
  static associate(models) {
    Courses.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: "categoryId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: COURSES_TABLE,
      modelName: "Courses",
      timestamps: false,
    };
  }
}

module.exports = { COURSES_TABLE, CoursesSchema, Courses };