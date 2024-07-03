const router = require("express").Router();

router.use("/habits", require("./habits.routes.js"));
router.use("/groups", require("./groups.routes.js"));
router.use("/profiles", require("./profiles.routes.js"));

module.exports = router;
