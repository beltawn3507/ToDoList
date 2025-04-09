const { validateToken } = require("../services/authentication");

const checkforauth = (cookiename) => {
  return (req, res, next) => {
    const tokenvalue = req.cookies[cookiename];
    if (!tokenvalue) {
      return next(); // No token, continue without user
    }

    try {
      const userpayload = validateToken(tokenvalue); // Should return user info
      req.user = userpayload; // Attach user info to request
    } catch (error) {
      console.log("Token verification failed:", error.message);
    }

    return next();
  };
};

module.exports = { checkforauth };