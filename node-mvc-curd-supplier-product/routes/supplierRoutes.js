const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

router.get("/", supplierController.getAllSuppliers);
router.get("/new", supplierController.newSupplier);
router.post("/", supplierController.createSupplier);
router.get("/:id/edit", supplierController.editSupplier);
router.post("/:id", supplierController.updateSupplier);
router.post("/:id/delete", supplierController.deleteSupplier);

module.exports = router;
