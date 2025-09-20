const Supplier = require("../models/Supplier");

async function getAllSuppliers() {
  return await Supplier.find();
}

async function getBySupplierId(id) {
  return await Supplier.findById(id);
}

async function createSupplier(supplierData) {
  const supplier = new Supplier(supplierData);
  return await supplier.save();
}

async function editSupplier(supplierData) {
  const supplier = await Supplier.findById(supplierData.id);
  supplier.name = supplierData.name;
  supplier.address = supplierData.address;
  supplier.phone = supplierData.phone;
  return await supplier.save();
}

async function deleteSupplier(supplierData) {
  return await Supplier.findByIdAndDelete(supplierData.id);
}

module.exports = {
  getAllSuppliers,
  getBySupplierId,
  createSupplier,
  editSupplier,
  deleteSupplier,
};
