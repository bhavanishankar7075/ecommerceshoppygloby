const jwt = require("jsonwebtoken");

/**
 * @function protect
 * @description Middleware to protect routes by verifying the JWT token (60 Marks).
 * Adds the authenticated user's ID to the request object (req.userId).
 */
const protect = (req, res, next) => {
  // 1. Get token from header (usually 'Bearer TOKEN')
  let token = req.header("Authorization");

  if (token && token.startsWith("Bearer ")) {
    // Remove 'Bearer ' prefix
    token = token.split(" ")[1];
  }

  // 2. Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
      success: false,
    });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user ID to the request object
    req.userId = decoded.id;
    next();
  } catch (error) {
    // 5. Handle invalid token
    return res.status(401).json({
      message: "Invalid token.",
      success: false,
    });
  }
};

module.exports = protect;
