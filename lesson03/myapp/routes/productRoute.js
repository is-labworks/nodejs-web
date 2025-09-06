const express = require("express");
const ProductController = require("../controllers/productcontroller");
const codeValidation = require("../middlewares/codevalidation");
const nameValidation = require("../middlewares/namevalidation");
const priceValidation = require("../middlewares/pricevalidation");
const quantityValidation = require("../middlewares/quantityvalidation");
const errorHandler = require("../middlewares/errorhandler");

const router = express.Router();
const controller = new ProductController();

(async () => {
  await controller.init();
})();

router.get("/", async (req, res, next) => {
  try {
    const products = await controller.getAllProduct();
    res.json(products);
  } catch (err) {
    next(new Error("Failed to get list of products: ", err.message));
  }
});

router.post(
  "/",
  codeValidation,
  nameValidation,
  priceValidation,
  quantityValidation,
  async (req, res, next) => {
    try {
      const newProduct = await controller.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(new Error("Failed to add new product: " + error.message));
    }
  }
);

router.get("/:code", codeValidation, async (req, res, next) => {
  try {
    const product = await controller.getProductById(req.params.code);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    next(new Error("Failed to get product: " + error.message));
  }
});

router.put(
  "/:code",
  codeValidation,
  nameValidation,
  priceValidation,
  quantityValidation,
  async (req, res, next) => {
    try {
      const updateProduct = await controller.updateProduct(
        req.params.code,
        req.body
      );
      res.json(updateProduct);
    } catch (error) {
      next(new Error("Failed to modify product: " + error.message));
    }
  }
);

router.delete("/:code", codeValidation, async (req, res, next) => {
  try {
    const deleted = await controller.deleteProduct(req.params.code);
    res.json(deleted);
  } catch (error) {
    next(new Error("Failed to deleted product: " + error.message));
  }
});

// Error handler middleware (should be last)
router.use(errorHandler);

module.exports = router;
