# Enterprise E-Commerce & Analytics Platform

A scalable, full-stack enterprise web application featuring role-based access control (RBAC), catalog search/filtering, automated order processing with inventory management, and an executive real-time analytics dashboard.

---

## 🚀 Features

* **Role-Based Access Control (RBAC)**: Secure access division between `customer` and `admin` roles powered by JWT and `bcryptjs`.
* **Catalog & Inventory Management**: Full product listing with category filtering and full-text MongoDB indexing.
* **Order Processing & Checkout**: Automated inventory deduction, transaction verification, and order tracking.
* **Executive Analytics Dashboard**: Real-time aggregation of total revenue, processed orders, active catalog counts, and registered user metrics.
* **Dark-Themed Responsive UI**: Built with modern CSS Grid, Flexbox, and ES6 Fetch API integration.

---

## 🛠️ Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript ES6
* **Backend**: Node.js, Express.js
* **Database**: MongoDB Atlas, Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT), `bcryptjs`
* **Middleware**: CORS, `dotenv`, express.json

---

## 📁 Repository Structure

```text
online-commerce-platform/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification & RBAC authorization
│   ├── models/
│   │   ├── Order.js         # Order schema & checkout items
│   │   ├── Product.js       # Product schema with text index
│   │   └── User.js          # User schema (customer/admin)
│   ├── .env                 # Environment variables (gitignored)
│   ├── .gitignore           # Git ignore rules
│   ├── package.json         # Dependencies & scripts
│   ├── seed.js              # Initial database seeding script
│   └── server.js            # Express API gateway & endpoints
└── frontend/
    ├── app.js               # Dynamic UI rendering & API handlers
    ├── index.html           # Main portal layout
    └── style.css            # Dark UI styling

⚡ Quick Start (Local Setup)
1. Prerequisites
Node.js (v18+)

MongoDB Atlas Cluster or local MongoDB instance

2. Backend Setup
Bash
cd backend
npm install

3. Seed Database & Start Server
Bash
# Seed initial admin user and sample products
npm run seed

# Run local development server
npm run dev

📡 REST API Reference
Authentication (/api/auth)
POST /api/auth/register — Register a customer or admin account

POST /api/auth/login — Authenticate user & return JWT token

Catalog Management (/api/products)
GET /api/products — Fetch products with optional ?search= and ?category= params

POST /api/products — Add a new product (Requires Admin JWT)

Orders (/api/orders)
POST /api/orders — Checkout cart items and deduct inventory (Requires Customer JWT)

GET /api/orders/my-orders — View customer order history (Requires Customer JWT)

Analytics (/api/analytics)
GET /api/analytics/dashboard — Aggregated business metrics (Requires Admin JWT)

👤 Author
Kaushal Kumar — GitHub

Deployed Link - https://enterprise-commerce-platform-1.onrender.com/
