const Product = require("../models/Product");
const Supplier = require("../models/Supplier");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().populate("supplierId");
  res.render("products/index", { products });
};

exports.newProduct = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("products/new", { suppliers });
};

exports.createProduct = async (req, res) => {
  const { name, price, quantity, supplierId } = req.body;
  await Product.create({ name, price, quantity, supplierId });
  res.redirect("/products");
};

exports.editProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render("products/edit", { product, suppliers });
};

exports.updateProduct = async (req, res) => {
  const { name, price, quantity, supplierId } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplierId });
  res.redirect("/products");
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
};