const Product = require('../models/Product');
const User = require('../models/User');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const photo = req.file ? req.file.filename : null;
    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      photo,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const photo = req.file ? req.file.filename : null;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.photo = photo || product.photo;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    await product.remove();
    res.json({ msg: 'Product removed successfully' });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const createProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    const user = await User.findById(req.user.id);
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id.toString());
    if (alreadyReviewed) {
      return res.status(400).json({ msg: 'Product already reviewed' });
    }
    const review = {
      user: req.user.id,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ msg: 'Review added' });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

const uploadCSV = async (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const item of results) {
          const { name, description, price, category, stock } = item;
          const product = new Product({
            name,
            description,
            price,
            category,
            stock,
          });
          await product.save();
        }
        res.status(201).json({ msg: 'Products added successfully' });
      });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, uploadCSV };
