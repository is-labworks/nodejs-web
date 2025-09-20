const express = require("express");
const router = express.Router();
const supplierApi = require("../apis/supplierApi");

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     tags: [Suppliers]
 *     summary: Retrieve a list of suppliers
 *     description: Retrieve a list of all suppliers from the database.
 *     responses:
 *       200:
 *         description: A list of suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get("/", async (req, res, next) => {
  try {
    const suppliers = await supplierApi.getAllSuppliers();
    res.json(suppliers);
  } catch (err) {
    next(new Error(`Failed to get list of suppliers: ${err.message}`));
  }
});

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     tags: [Suppliers]
 *     summary: Get a supplier by ID
 *     description: Retrieve a single supplier by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the supplier to retrieve.
 *     responses:
 *       200:
 *         description: The requested supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found.
 */
router.get("/:id", async (req, res, next) => {
  try {
    const supplier = await supplierApi.getBySupplierId(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  } catch (err) {
    next(new Error(`Failed to get supplier: ${err.message}`));
  }
});

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     tags: [Suppliers]
 *     summary: Create a new supplier
 *     description: Create a new supplier in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: The created supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */
router.post("/", async (req, res, next) => {
  try {
    const supplier = await supplierApi.createSupplier(req.body);
    res.json(supplier);
  } catch (err) {
    next(new Error(`Failed to create supplier: ${err.message}`));
  }
});

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     tags: [Suppliers]
 *     summary: Update a supplier
 *     description: Update an existing supplier by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the supplier to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: The updated supplier.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 */
router.put("/:id", async (req, res, next) => {
  try {
    const supplier = await supplierApi.editSupplier({
      ...req.body,
      id: req.params.id,
    });
    res.json(supplier);
  } catch (err) {
    next(new Error(`Failed to update supplier: ${err.message}`));
  }
});

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     tags: [Suppliers]
 *     summary: Delete a supplier
 *     description: Delete a supplier by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the supplier to delete.
 *     responses:
 *       200:
 *         description: Supplier deleted successfully.
 */
router.delete("/:id", async (req, res, next) => {
  try {
    await supplierApi.deleteSupplier({ id: req.params.id });
    res.json({ message: "Supplier deleted successfully" });
  } catch (err) {
    next(new Error(`Failed to delete supplier: ${err.message}`));
  }
});

module.exports = router;
