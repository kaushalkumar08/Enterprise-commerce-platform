const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const sampleProducts = [
  {
    title: 'Enterprise Cloud Server Rack Unit',
    sku: 'SRV-1001',
    description: 'High-density multi-core rack server optimized for cloud computing and AI workloads.',
    price: 2499.99,
    stock: 12,
    category: 'Hardware',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500'
  },
  {
    title: 'UltraWide Curved Developer Monitor 38"',
    sku: 'MON-3802',
    description: '38-inch WQHD+ curved monitor with USB-C power delivery and 144Hz refresh rate.',
    price: 999.50,
    stock: 4,
    category: 'Monitors',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
  },
  {
    title: 'Ergonomic Mesh Task Chair',
    sku: 'CHR-9901',
    description: 'Fully adjustable mesh chair engineered for high-performance engineering teams.',
    price: 450.00,
    stock: 25,
    category: 'Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=500'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Seeding Database...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Kaushal Kumar',
      email: 'admin@enterprise.com',
      password: hashedAdminPassword,
      role: 'admin'
    });

    const hashedCustomerPassword = await bcrypt.hash('customer123', 10);
    const customer = await User.create({
      name: 'Sample Customer',
      email: 'customer@enterprise.com',
      password: hashedCustomerPassword,
      role: 'customer'
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    await Order.create({
      customer: customer._id,
      items: [{ product: createdProducts[0]._id, quantity: 1, unitPrice: createdProducts[0].price }],
      totalAmount: createdProducts[0].price,
      paymentStatus: 'completed'
    });

    console.log('Seeding Complete!');
    console.log('Admin Account: admin@enterprise.com / admin123');
    console.log('Customer Account: customer@enterprise.com / customer123');
    process.exit(0);
  } catch (err) {
    console.error('Seeding Failed:', err);
    process.exit(1);
  }
}

seed();