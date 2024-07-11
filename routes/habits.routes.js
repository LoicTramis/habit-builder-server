const router = require("express").Router();
const { getToken, isAuth } = require("../middleware/jwt.middleware");
const Habit = require("../model/Habit.model");

// Get all habits of one user
router.get("/in", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    console.log(userId);
    const habits = await Habit.find({ creator: userId })
      .populate({ path: "creator", select: "-password" })
      .populate({ path: "members", select: "-password" });

    res.status(200).json(habits);
  } catch (error) {
    next(error);
  }
});

// Get all habits
router.get("/", async (req, res, next) => {
  try {
    const habits = await Habit.find({})
      .populate({ path: "creator", select: "-password" })
      .populate({ path: "members", select: "-password" });

    res.status(200).json(habits);
  } catch (error) {
    next(error);
  }
});

// Get one habit
router.get("/:habitId", async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.find({ _id: habitId }).populate("creator");
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

// Create one habit
router.post("/", getToken, async (req, res, next) => {
  try {
    const creator = req.payload.id;
    const { title, description, frequency, difficulty, status } = req.body;
    const newHabit = { title, description, frequency, creator, difficulty, status };

    // Save in DB
    const createdHabit = await Habit.create(newHabit);
    // Response
    res.status(201).json(createdHabit);
  } catch (error) {
    next(err);
  }
});

// Update one habit (admin only)
router.put("/:habitId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { habitId } = req.params;
    console.log(habitId);
    const { title, description, frequency, difficulty, status } = req.body;

    const habitToUpdate = { title, description, frequency, difficulty, status };
    console.log(habitToUpdate);

    const updatedHabit = await Habit.findOneAndUpdate(
      { $and: [{ _id: habitId }, { creator: userId }] },
      habitToUpdate,
      { new: true }
    );
    console.log(updatedHabit);
    res.status(200).json(updatedHabit);
  } catch (error) {
    next(error);
  }
});

// Delete one habit (admin only)
router.delete("/:habitId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { habitId } = req.params;

    const deletedHabit = await Habit.findOneAndDelete({ _id: habitId, creator: userId });

    res.status(202).json(deletedHabit);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
