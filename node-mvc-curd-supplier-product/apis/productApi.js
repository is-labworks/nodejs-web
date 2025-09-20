const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

async function getAllProducts() {
  const products = await Product.find().populate("supplierId");
  return products;
}

async function getProductById(req) {
  const product = await Product.findById(req.params.id);
  return { product };
}

async function createProduct(req) {
  const { name, price, quantity, supplierId } = req.body;
  await Product.create({ name, price, quantity, supplierId });
  return { message: "Product created successfully" };
}

async function editProduct(req) {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  return { product, suppliers };
}

async function updateProduct(req, res) {
  const { name, price, quantity, supplierId } = req.body;
  await Product.findByIdAndUpdate(req.params.id, {
    name,
    price,
    quantity,
    supplierId,
  });
  return { message: "Product updated successfully" };
}

async function deleteProduct(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  return { message: "Product deleted successfully" };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  updateProduct,
  deleteProduct,
};
