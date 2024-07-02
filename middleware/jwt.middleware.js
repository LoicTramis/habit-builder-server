const jwt = require("jsonwebtoken");

// Instantiate the JWT token validation middleware
const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.TOKEN_SECRET);

        req.payload = payload;

        next();
    } catch (error) {
        res.status(401).json("token not provided or not valid");
    }
};

module.exports = {
    isAuth,
};
