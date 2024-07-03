const router = require("express").Router();
const { isAuth } = require("../middleware/jwt.middleware");
const User = require("../model/User.model");

router.get("/:groupId", isAuth, async (req, res, next) => {});

module.exports = router;
