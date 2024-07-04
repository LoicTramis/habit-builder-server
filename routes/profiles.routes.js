const router = require("express").Router();
const { isAuth } = require("../middleware/jwt.middleware");
const User = require("../model/User.model");

router.get("/", isAuth, async (req, res, next) => {});

module.exports = router;
