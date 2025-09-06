const TransDao = require("../daos/transdao");
const Transaction = require("../models/trans");

class TransactionRepo {
  constructor() {
    this.trans = [];
    this.dao = new TransDao();
  }

  //Load data into memory
  async init() {
    this.trans = await this.dao.readData();
  }

  async getAll() {
    return this.trans;
  }

  async getById(tid) {
    const raw = this.trans.find((p) => p.tid === tid);
    return raw
      ? new Transaction(raw.tid, raw.pcode, raw.tamount, raw.ttime)
      : null;
  }

  async create(transData) {
    if (this.trans.find((p) => p.tid === transData.tid)) {
      throw new Error("Transaction id already exists");
    }

    const newTrans = new Transaction(
      transData.tid,
      transData.pcode,
      transData.tamount,
      transData.ttime
    );

    this.trans.push(newTrans);
    await this.dao.writeData(this.trans);

    return newTrans;
  }
}

// make sure to export single instance of TransactionRepo
const instance = new TransactionRepo();
module.exports = instance;
