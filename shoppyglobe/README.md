ShoppyGlobe E-commerce Application (Full-Stack)

Project Objective

This project is a complete e-commerce platform built using React (Vite) for the frontend and Node.js/Express.js with MongoDB for the backend API. The goal was to demonstrate a functional, authenticated, and persistent full-stack solution, meeting all specified requirements from both project documents.

Submission Guidelines

I am submitting this project under the following guidelines:

I confirm that the project includes at least 25 relevant commits in the GitHub repository.

The submission includes all code folders (shoppyglobe and backend-api).

Note: I have ensured the node_modules folder is removed from both directories in the submission package.

GitHub Repository Link: https://github.com/bhavanishankar7075/ecommerceshoppygloby/tree/main/shoppyglobe

Architecture and File Structure

The project is split into two distinct services:

ecommerceshoppygloby/
├── backend-api/  <-- Node.js/Express Server
│   ├── routes/
│   │   ├── authRoutes.js    # /register, /login
│   │   ├── productRoutes.js # GET products
│   │   └── cartRoutes.js    # Protected CRUD
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
└── shoppyglobe/  <-- React Frontend (Vite)
    ├── src/
    │   ├── components/
    │   ├── pages/         # (ProductList, Cart, Checkout, Auth, NotFound)
    │   ├── redux/         # (Maintained for local badge count/display)
    │   ├── hooks/
    │   └── App.jsx


Technical Implementation Details

1. Backend API (Node.js, Express, MongoDB, JWT)

API Setup: Built using Node.js and Express.js, running on http://localhost:5000.

MongoDB Integration: Data is persisted in MongoDB using Mongoose.

Collections: Implemented Products (name, price, stock) and Cart (linked to User via ObjectId, containing product references).

CRUD Operations: Full Mongoose CRUD logic is implemented for both products and the user's cart.

Authentication & Authorization:

Implemented JWT-based authentication (bcryptjs for hashing, jsonwebtoken for tokens).

Routes /api/register and /api/login handle authentication.

Crucial: All cart routes (GET /cart, POST /cart, etc.) are protected by the JWT middleware, allowing access only to logged-in users.

Error Handling: Implemented global error handling middleware and validation (e.g., product existence checks).

2. Frontend (React, Data Flow, UX)

Integration: The frontend is fully integrated with the backend API, sending the JWT token with all protected requests.

Component Architecture: All required components (App, Header, ProductList, Cart, Checkout, NotFound) are implemented using functional components and hooks.

Data Flow: Redux is simplified to manage local state (e.g., the shopping cart badge count) for immediate user experience (UX) feedback, while the true source of cart data is the backend API.

Performance Optimization: All major page components are lazy-loaded using React.lazy and Suspense. Images use native loading="lazy".

Styling: The application is fully responsive, and all currency is correctly displayed as the Indian Rupee symbol (₹).

UX Actions: Implemented instant toast notifications and immediate header count updates upon successfully adding an item to the remote cart.

How to Run the Full-Stack Project Locally

Backend Setup:

Navigate to the backend-api directory.

Run npm install.

Crucial: Create a .env file with your MONGO_URI and JWT_SECRET.

Populate DB: Insert the product data into your MongoDB products collection.

Start the server: npm start (Runs on http://localhost:5000).

Frontend Setup:

Navigate to the shoppyglobe directory.

Run npm install.

Start the frontend: npm run dev (Runs on http://localhost:5173/).

Testing Sequence:

Login/Register via the frontend UI.

Test cart operations (Add, Remove, Update).

API Testing Documentation

Detailed documentation proving all API routes (Auth, Products, Cart CRUD) are functional, including screenshots from ThunderClient and MongoDB, is provided separately in the backend-api/docs/ folder.