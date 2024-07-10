const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const getToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Get the payload if tokens match
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.payload = payload;

    next();
  } catch (error) {
    res.status(401).json("token not provided or not valid");
  }
};

const isAuth = (req, res, next) => {};

module.exports = {
  getToken,
  isAuth,
};
