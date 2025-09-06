const ProductRepo = require("../repositories/productrepo");

class ProductController {
  constructor() {
    this.repo = ProductRepo;
  }

  async init() {
    await this.repo.init();
  }

  async getAllProduct() {
    const products = await this.repo.getAll();

    if (!products) {
      throw Error("Product not found");
    }

    return products;
  }

  async createProduct(productData) {
    const existing = await this.repo.getById(productData.code);
    if (existing) {
      throw new Error("Product code already exists");
    }
    return await this.repo.create(productData);
  }

  async getProductById(code) {
    const product = await this.repo.getById(code);

    if (!product) {
      throw Error("Product not found");
    }

    if (typeof product.total === "function" && product.total() > 1000) {
      product.name = product.name.toUpperCase();
    }

    return product;
  }

  async updateProduct(code, updatedData) {
    const product = await this.repo.getById(code);
    if (!product) {
      throw new Error("Product not found");
    }
    return await this.repo.update(code, updatedData);
  }

  async deleteProduct(code) {
    const product = await this.repo.getById(code);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.quantity > 0) {
      throw new Error("Cannot delete a product with remaining stock");
    }

    return await this.repo.delete(code);
  }
}

module.exports = ProductController;
