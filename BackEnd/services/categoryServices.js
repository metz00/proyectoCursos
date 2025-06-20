const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class CategoryServices {
  constructor() {
    this.model = models.Categories;
  }

  async getIdCategory(id) {
    const category = await this.model.findByPk(id);
    if (!category) {
      throw boom.notFound("Category not found");
    }
    return { data: category };
  }

  async getCategories() {
    const categories = await this.model.findAll({
      include: ['courses']
    });
    return categories;
  }

  async create(categoryData) {
    const newCategory = await this.model.create(categoryData);
    return {created: true, data: newCategory};
  }

  async update(id, changes) {
    const category = await this.model.findByPk(id);
    if (!category) {
      throw boom.notFound("Category not found");
    }
    const updated = await category.update(changes);
    return { updated: true, data: updated};
  }

  async delete(id) {
    const category = await this.model.findByPk(id);
    if (!category) {
      throw boom.notFound("Category not found");
    }
    await category.destroy();
    return { message: "Category deleted successfully" };
  }
}

module.exports = CategoryServices;
