// controllers/product.controller.js

import Product from '../models/product.model.js';

const productCtrl = {};

// Create a new product
productCtrl.create = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a list of all products
productCtrl.list = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific product by ID
productCtrl.read = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new Error('Product not found');
        res.status(200).json(product);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
};

// Update a product by ID
productCtrl.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) throw new Error('Product not found');
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product by ID
productCtrl.remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw new Error('Product not found');
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Middleware to find product by name (ignoring spaces)
productCtrl.productByName = async (req, res, next) => {
    let productName = req.query.name;
  
    try {
      if (!productName) {
        throw new Error('Product name not provided in the query parameter.');
      }
  
      // Remove spaces from the search query
      productName = productName.replace(/\s/g, '');
  
      const product = await Product.findOne({ name: new RegExp(productName, 'i') });
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      req.product = product;

      console.log(product)
      next();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  
  

// Delete all products
productCtrl.deleteAll = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export default productCtrl;
