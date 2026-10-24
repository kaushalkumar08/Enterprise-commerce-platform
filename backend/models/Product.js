const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  sku: { type: String, required: true, unique: true, uppercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true, index: true },
  imageUrl: { type: String, default: 'https://via.placeholder.com/300' },
  createdAt: { type: Date, default: Date.now }
});

ProductSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', ProductSchema);