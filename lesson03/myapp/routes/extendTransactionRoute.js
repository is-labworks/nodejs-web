const express = require('express');
const TransactionController = require('../controllers/transactioncontroller');
const errorHandler = require('../middlewares/errorhandler');

const router = express.Router();
const controller = new TransactionController();

(async () => {
  await controller.init();
})();

/**
 * @openapi
 * /transactions/find/{code}:
 *   get:
 *     tags: [Transactions]
 *     summary: Find all transactions by product code
 *     description: Returns a list of all transactions related to a specific product code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           example: P001
 *         description: The product code to search for
 *     responses:
 *       200:
 *         description: List of matching transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Product not found or no transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get transactions by product code: Product not found
 */
router.get(
  '/find/:code',
  async (req, res, next) => {
    try {
      const transactions = await controller.findByProductCode(req.params.code);
      res.json(transactions);
    } catch (error) {
      next(new Error("Failed to get transactions by product code: " + error.message));
    }
  }
);

/**
 * @openapi
 * /transactions/summary/{code}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get transaction summary by product code
 *     description: Returns the total number of transactions and total amount for a specific product code.
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *           example: P001
 *         description: The product code to summarize transactions for
 *     responses:
 *       200:
 *         description: Summary of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 total:
 *                   type: number
 *                   example: 1500
 *       404:
 *         description: Product not found for summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to get transaction summary: Product not found for summary
 */
router.get(
  '/summary/:code',
  async (req, res, next) => {
    try {
      const summary = await controller.summaryByProductCode(req.params.code);
      res.json(summary);
    } catch (error) {
      next(new Error("Failed to get transaction summary: " + error.message));
    }
  }
);

router.use(errorHandler);

module.exports = router;