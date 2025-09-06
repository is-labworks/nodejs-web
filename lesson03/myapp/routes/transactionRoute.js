const express = require("express");
const TransactionController = require("../controllers/transactioncontroller");
const errorHandler = require("../middlewares/errorhandler");

const router = express.Router();
const controller = new TransactionController();

(async () => {
  await controller.init();
})();

router.get("/", async (req, res, next) => {
  try {
    const transactions = await controller.getAllTransaction();
    res.json(transactions);
  } catch (err) {
    next(new Error("Failed to get list of transactions: ", err.message));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTransaction = await controller.createTransaction(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    next(new Error("Failed to add new transaction: " + error.message));
  }
});

router.get("/:tid", async (req, res, next) => {
  try {
    const transaction = await controller.getTransactionById(req.params.tid);
    if (!transaction) {
      return res.status(404).json({ error: "transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    next(new Error("Failed to get transaction: " + error.message));
  }
});

router.put("/:tid", async (req, res, next) => {
  res.json(405, { error: "Update transaction is not supported" });
});

router.delete("/:tid", async (req, res, next) => {
  res.json(405, { error: "Delete transaction is not supported" });
});

router.use(errorHandler);

module.exports = router;
