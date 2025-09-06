const fs = require('fs').promises;
const path = require('path');
const Transaction = require('../models/trans');

const dataPath = path.join(__dirname, '../database/trans.json');

class TransDao {
    constructor() {
        this.trans = [];
    }

    async readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const jsonData = JSON.parse(data);

            this.trans = jsonData.trans.map(
                (p) => new Transaction(p.tid, p.pcode, p.tamount, p.ttime)
            );

            return this.trans;
        } catch (err) {
            if (err.code === 'ENOENT') {
                this.trans = [];
            } else {
                throw err;
            }
        }
    }

    async writeData() {
        try {
            const jsonData = {
                trans: this.trans.map((p) => ({
                    tid: p.tid,
                    pcode: p.pcode,
                    tamount: p.tamount,
                    ttime: p.ttime,
                }))
            };
            await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf-8');
            console.log("Data successfully written to data.json");
        } catch(err) {
            console.error("Error writting data: ", err);
        }
    }
}

module.exports = TransDao;