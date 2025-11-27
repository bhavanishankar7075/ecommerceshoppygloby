ShoppyGlobe E-commerce Application

Project Objective

This project is a basic e-commerce application named ShoppyGlobe, built using React and Vite. The application fulfills all the specified functional and non-functional requirements detailed in the project PDF, focusing on modern component architecture, Redux state management, data handling, and performance.

Submission Guidelines (As per Project PDF)

Submit a link to your GitHub repository with the completed project. There should be at least 25 commits in the GitHub repository (Commits should be relevant).

Note: Do not share the Git-Repo link only. Put the repo link inside the Readme file and send the entire code folder.

GitHub Repository Link: https://github.com/bhavanishankar7075/ecommerceshoppygloby/tree/main/shoppyglobe

Technical Overview and Implementation Details

1. Project Setup and Environment

Vite Project: The project was initialized using Vite with a React template, meeting the foundational requirement.

Code Quality: Proper indentation and clean, professional block comments are used.

Styling: Custom external CSS files are used for every component. The application is fully responsive, with styles adjusted for mobile, tablet, and desktop viewing.

Currency: All prices and totals use the Indian Rupee symbol (₹).

2. File Structure and Component Hierarchy

The project follows a modular, organized structure:

shoppyglby/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── ProductItem/
│   │   ├── CartItem/
│   │   └── Loader/
│   ├── pages/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   └── NotFound/
│   ├── redux/
│   │   ├── store.js
│   │   └── cartSlice.js
│   ├── hooks/
│   │   └── useFetchProducts.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css


Component Summary:

App, Header: Main layout and navigation container.

ProductList, ProductDetail: Primary catalog and single item views.

Cart, CartItem: Display and management of items in the shopping cart.

Checkout: Dummy user form and order finalization.

NotFound: 404 page displaying proper route error details.

3. State Management and Data Flow

Redux Implementation: Redux Toolkit is used for centralizing cart state (cartSlice.js), including implementation of actions (addItem, removeItem, updateQuantity, clearCart), reducer, and selectors (for cart count and total).

Data Persistence: A Redux middleware is implemented to save the cart state to localStorage after every change, ensuring cart contents are not lost on browser reload.

Props: Prop types (prop-types) are utilized throughout reusable components (ProductItem, CartItem) to enforce data structure integrity.

4. Data Fetching, Routing, and Performance

Data Fetching: Products are fetched from https://dummyjson.com/products. Custom hooks and useEffect are used for fetching product lists and individual product details based on route parameters.

Error Handling: Robust try/catch and status code checks are included in all data fetching hooks/logic.

Routing: Implemented using createBrowserRouter to define routes for Home (/), dynamic Product Detail (/product/:productId), Cart, Checkout, and the custom 404 page.

React Lists: Products and cart items are rendered with mandatory unique key attributes.

Performance Optimization:

Code Splitting: All major page components are lazy-loaded using the lazy property in the route definitions and rendered within Suspense.

Image Optimization: Native loading="lazy" attribute is used on all product images.

5. Event and Interaction Logic

Cart Actions: Implemented event handlers for adding products, removing products, and controlling quantity. The quantity control logic ensures the item count remains 1 or greater.

Checkout Logic: Includes client-side form validation. Upon successful submission, the component displays the "Order placed" message, dispatches the Redux clearCart action, and automatically redirects the user to the Home page.

How to Run Locally

Clone the repository.

Navigate to the shoppyglobe directory.

Install dependencies (npm install).

Run the application (npm run dev).