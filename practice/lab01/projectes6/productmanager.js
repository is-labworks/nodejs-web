const Product = require('./product');

class ProductManager {
    constructor() {
        this.products = [];
    }

    // Create: Add a new product
    addProduct(product) {
        // Check for duplicate code
        if (this.products.some(p => p.code === product.code)) {
            return false; // Duplicate code, do not add
        }
        this.products.push(product);
        return true; //
    }

    // Read: Get all products
    getAllProducts() {
        return this.products;
    }

    // Read: Get product by code
    getProductByCode(code) {
        return this.products.find(p => p.code === code);
    }

    // Update: Update product by code
    updateProduct(code, updatedFields) {
        const product = this.getProductByCode(code);
        if (product) {
            Object.assign(product, updatedFields);
            return true;
        }
        return false;
    }

    // Delete: Remove product by code
    deleteProduct(code) {
        const index = this.products.findIndex(p => p.code === code);
        if (index !== -1) {
            this.products.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = ProductManager;