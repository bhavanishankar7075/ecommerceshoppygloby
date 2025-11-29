ShoppyGlobe E-commerce Application

Project Objective

This project is a basic e-commerce application named ShoppyGlobe, built using React and Vite. The primary goal was to fulfill all specified functional and non-functional requirements, demonstrating proficiency in modern component architecture, Redux state management, data handling, and performance optimization as required by the project PDF.

Submission Guidelines

I am submitting this project under the following guidelines:

I confirm that the code includes at least 25 relevant commits in the GitHub repository.

Note: I am sending the entire code folder. The GitHub link is provided below, and I have ensured the node_modules folder is removed from the submission package.

GitHub Repository Link: https://github.com/bhavanishankar7075/ecommerceshoppygloby/tree/main/shoppyglobe

Technical Overview and Implementation Details

1. Project Setup and Environment

Vite Project: The project was initialized using Vite, meeting the foundational requirement.

Code Quality: The code uses proper indentation, clean structure, and functional components.

Styling: Custom external CSS files are used for every component to achieve a fully responsive and modern layout across all screen sizes.

Currency: All prices and totals use the Indian Rupee symbol (₹).

2. File Structure and Component Hierarchy

The project follows a modular, organized structure:

shoppyglby/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── ProductItem/
│   │   ├── CartItem/
│   │   └── Loader/
│   ├── pages/
│   │   ├── ProductList/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   └── NotFound/
│   ├── redux/
│   │   ├── store.js
│   │   └── cartSlice.js
│   ├── hooks/
│   │   └── useFetchProducts.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css



3. State Management and Data Flow

Redux Implementation: Redux Toolkit manages the central cart state. This includes implementing all necessary actions (addItem, removeItem, updateQuantity, clearCart), reducers, and selectors (for cart count and total).

Data Persistence: A custom Redux middleware is implemented to save the cart state to localStorage and persists even if the browser is reloaded.

Props: I used prop-types extensively in reusable components (ProductItem, CartItem) to ensure data integrity and reusability.

4. Data Fetching, Routing, and Performance

Data Fetching: Products are fetched from the external endpoint: https://dummyjson.com/products. Custom hooks and useEffect manage the fetching and state.

Routing: Implemented using createBrowserRouter to handle all defined routes, including the dynamic Product Detail page and the custom NotFound (404) component.

Performance Optimization:

Code Splitting: All major page components are lazy-loaded using React.lazy and wrapped in Suspense.

Image Optimization: Native loading="lazy" attribute is applied to all product images.

5. Event and Interaction Logic

Cart Actions: Event handlers successfully manage the addition, removal, and quantity updates of items. The quantity control logic strictly enforces the requirement that the item count must be 1 or greater.

Checkout Logic: The component features form validation. Upon successful submission, the cart is cleared (via Redux clearCart), and the user is automatically redirected back to the Home page after showing a success message.

How to Run Locally

Clone the repository.

Navigate to the shoppyglobe directory.

Install dependencies (npm install).

Run the application (npm run dev).