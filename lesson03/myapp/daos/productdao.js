const fs = require('fs').promises;
const path = require('path');
const Product = require('../models/product');

const dataPath = path.join(__dirname, '../database/data.json');

class ProductDao {
    constructor() {
        this.products = [];
    }

    async readData() {
        try {
            const data = await fs.readFile(dataPath, 'utf-8');
            const jsonData = JSON.parse(data);

            this.products = jsonData.products.map(
                (p) => new Product(p.code, p.name, p.price, p.quantity)
            );

            return this.products;
        } catch (err) {
            if (err.code === 'ENOENT') {
                this.products = [];
            } else {
                throw err;
            }
        }
    }

    async writeData() {
        try {
            const jsonData = {
                products: this.products.map((p) => ({
                    code: p.code,
                    name: p.name,
                    price: p.price,
                    quantity: p.quantity,
                }))
            };
            await fs.writeFile(dataPath, JSON.stringify(jsonData, null, 2), 'utf-8');
            console.log("Data successfully written to data.json");
        } catch(err) {
            console.error("Error writting data: ", err);
        }
    }
}

module.exports = ProductDao;