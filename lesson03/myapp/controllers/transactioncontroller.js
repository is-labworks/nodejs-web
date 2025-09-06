const TransactionRepo = require("../repositories/transrepo");
const ProductRepo = require("../repositories/productrepo");

class TransactionController {
  constructor() {
    this.repo = TransactionRepo;
    this.productRepo = ProductRepo;
  }

  async init() {
    await this.repo.init();
    await this.productRepo.init();
  }

  async getAllTransaction() {
    const transactions = await this.repo.getAll();
    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions found");
    }
    return transactions;
  }

  async createTransaction(transData) {
    // 1. Validate transaction id format: TXYYYYY
    const tidPattern = /^TX\d{5}$/;
    if (!tidPattern.test(transData.tid)) {
      throw new Error("Invalid TID format. Expected: TXYYYYY (Y = digit).");
    }

    // 2. Check if transaction already exists
    const existing = await this.repo.getById(transData.tid);
    if (existing) {
      throw new Error("Transaction ID already exists");
    }

    // 3. Get product by product code (pcode)
    const product = await this.productRepo.getById(transData.pcode);
    if (!product) {
      throw new Error("Product not found");
    }

    // 4. Validate transaction amount
    if (transData.tamount <= 0) {
      throw new Error("Transaction amount must be greater than zero");
    }
    if (transData.tamount > product.quantity) {
      throw new Error("Transaction amount cannot exceed product quantity");
    }

    // 5. Generate transaction time in format hh:mm:ss:dd:mm:yyyy
    const now = new Date();
    const pad = (n) => (n < 10 ? "0" + n : n);
    transData.ttime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(
      now.getSeconds()
    )}:${pad(now.getDate())}:${pad(now.getMonth() + 1)}:${now.getFullYear()}`;

    // 6. Create transaction
    const newTransaction = await this.repo.create(transData);

    // 7. Update product quantity
    product.quantity -= transData.tamount;
    await this.productRepo.update(product.code, {
      quantity: product.quantity,
    });

    return newTransaction;
  }

  async getTransactionById(tid) {
    const trans = await this.repo.getById(tid);
    if (!trans) {
      throw new Error("Transaction not found");
    }
    return trans;
  }

  async findByProductCode(code) {
    const product = await this.productRepo.getById(code);
    if (!product) {
      throw new Error(`Product ${code} not found for summary`);
    }
    const all = await this.repo.getAll();
    return all.filter((t) => t.pcode === code);
  }

  async summaryByProductCode(code) {
    const product = await this.productRepo.getById(code);
    if (!product) {
      throw new Error(`Product ${code} not found for summary`);
    }
    const all = await this.repo.getAll();
    const filtered = all.filter((t) => t.pcode === code);

    if (filtered.length === 0) {
      return { count: 0, total: 0 };
    }

    const count = filtered.length;
    const total = filtered.reduce(
      (sum, t) => sum + t.tamount * product.price,
      0
    );

    return { count, total };
  }
}

module.exports = TransactionController;
