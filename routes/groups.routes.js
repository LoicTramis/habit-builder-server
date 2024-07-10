const router = require("express").Router();
const { getToken } = require("../middleware/jwt.middleware");
const Group = require("../model/Group.model");

// Get all groups
router.get("/", async (req, res, next) => {
  try {
    const groups = await Group.find({})
      .populate({ path: "admin", select: "-password" })
      .populate("habits")
      .populate({ path: "members", select: "-password" });

    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
});

// Get all groups of one user
router.get("/in", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const groups = await Group.find({ members: { $in: [userId] } })
      .populate({ path: "admin", select: "-password" })
      .populate("habits")
      .populate({ path: "members", select: "-password" });

    res.status(200).json(groups);
  } catch (error) {
    next(error);
  }
});

// Get one group
router.get("/:groupId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { groupId } = req.params;

    const group = await Group.findOne({ _id: groupId, members: { $in: [userId] } });

    res.status(200).json(group);
  } catch (error) {
    next(error);
  }
});

// Create a group
router.post("/", getToken, async (req, res, next) => {
  try {
    const admin = req.payload.id;
    const { name, description, habits, members } = req.body;
    const newGroup = { name, description, admin, habits, members };

    const group = await Group.create(newGroup);

    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
});

// Change the group info
router.put("/:groupId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { groupId } = req.params;
    const { name, description } = req.body;
    const changedGroup = { name, description };

    const updatedGroup = await Group.findOneAndUpdate(
      { _id: groupId, admin: userId },
      changedGroup,
      { new: true }
    );

    res.status(202).json(updatedGroup);
  } catch (error) {
    next(error);
  }
});

// Add a user to a group
router.patch("/:groupId/add/:userId", getToken, async (req, res, next) => {
  try {
    const adminId = req.payload.id;
    const { groupId, userId } = req.params;

    const updatedGroup = await Group.findOneAndUpdate(
      {
        $and: [{ _id: groupId }, { admin: adminId }],
      },
      { $push: { members: userId } },
      { new: true }
    );

    res.status(202).json(updatedGroup);
  } catch (error) {
    next(error);
  }
});

// Delete a user from a group
router.patch("/:groupId/remove/:userId", getToken, async (req, res, next) => {
  try {
    const adminId = req.payload.id;
    const { groupId, userId } = req.params;

    const updatedGroup = await Group.findOneAndUpdate(
      {
        $and: [{ _id: groupId }, { admin: adminId }],
      },
      { $pull: { members: userId } },
      { new: true }
    );

    res.status(202).json(updatedGroup);
  } catch (error) {
    next(error);
  }
});

// Delete a group
router.delete("/:groupId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { groupId } = req.params;

    const deletedGroup = await Group.findOneAndDelete({
      $and: [{ _id: groupId }, { admin: userId }],
    });

    res.status(202).json(deletedGroup);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
