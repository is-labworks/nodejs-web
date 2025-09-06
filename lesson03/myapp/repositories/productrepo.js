const ProductDao = require("../daos/productdao");
const Product = require("../models/product");

class ProductRepo {
  constructor() {
    this.products = [];
    this.dao = new ProductDao();
  }

  //Load data into memory
  async init() {
    this.products = await this.dao.readData();
  }

  async getAll() {
    return this.products;
  }

  async getById(code) {
    const raw = this.products.find((p) => p.code === code);
    return raw
      ? new Product(raw.code, raw.name, raw.price, raw.quantity)
      : null;
  }

  async create(productData) {
    if (this.products.find((p) => p.code === productData.code)) {
      throw new Error("Product code already exists");
    }

    const newProduct = new Product(
      productData.code,
      productData.name,
      productData.price,
      productData.quantity
    );

    this.products.push(newProduct);
    await this.dao.writeData(this.products);

    return newProduct;
  }

  async update(code, updatedProduct) {
    const index = this.products.findIndex((p) => p.code === code);

    if (index === -1) {
      throw new Error("Product not found");
    }

    this.products[index] = {
      ...this.products[index],
      ...updatedProduct,
    };

    await this.dao.writeData(this.products);
    return this.products[index];
  }

  async delete(code) {
    const index = this.products.findIndex((p) => p.code === code);

    if (index === -1) {
      throw new Error("Product not found");
    }

    this.products.splice(index, 1);
    await this.dao.writeData(this.products);
    return true;
  }
}

// make sure to export single instance of ProductRepo
const instance = new ProductRepo();
module.exports = instance;
