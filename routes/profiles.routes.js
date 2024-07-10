const router = require("express").Router();
const { getToken } = require("../middleware/jwt.middleware");
const User = require("../model/User.model");

router.get("/", getToken, async (req, res, next) => {});

module.exports = router;
