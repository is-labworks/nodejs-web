const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model("Supplier", supplierSchema);