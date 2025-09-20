const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/new", productController.newProduct);
router.post("/", productController.createProduct);
router.get("/:id/edit", productController.editProduct);
router.post("/:id", productController.updateProduct);
router.post("/:id/delete", productController.deleteProduct);

module.exports = router;
