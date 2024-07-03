const router = require("express").Router();
const { isAuth } = require("../middleware/jwt.middleware");
const Group = require("../model/Group.model");

router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.find({});
    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
});

router.get("/:groupId", isAuth, async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId);
    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", isAuth, async (req, res, next) => {});

router.post("/", isAuth, async (req, res, next) => {
  try {
    const { name, description, admin, habits, members } = req.body;
    const newGroup = { name, description, admin, habits, members };
    const group = await Group.create(newGroup);
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
