class Transaction {
  constructor(tid, pcode, tamount, ttime) {
    this.tid = tid;
    this.pcode = pcode;
    this.tamount = tamount;
    this.ttime = ttime;
  }
}

module.exports = Transaction;