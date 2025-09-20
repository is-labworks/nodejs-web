const Supplier = require("../models/Supplier");

// List all suppliers
exports.getAllSuppliers = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render("suppliers/index", { suppliers });
};

// Show form new
exports.newSupplier = (req, res) => {
  res.render("suppliers/new");
};

// Create
exports.createSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  res.redirect("/suppliers");
};

// Edit form
exports.editSupplier = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render("suppliers/edit", { supplier });
};

// Update
exports.updateSupplier = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  res.redirect("/suppliers");
};

// Delete
exports.deleteSupplier = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect("/suppliers");
};
