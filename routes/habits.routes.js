const router = require("express").Router();
const { isAuth } = require("../middleware/jwt.middleware");
const Habit = require("../model/Habit.model");

// GET all habits
router.get("/", async (req, res, next) => {
  try {
    const habits = await Habit.find({});
    res.status(200).json(habits);
  } catch (error) {
    next(error);
  }
});

// GET one habit
router.get("/:habitId", async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.find({ _id: habitId });
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

// GET all habits for one user
router.get("/:userId", isAuth, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const habit = await Habit.find({ _id: habitId });
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

// POST one habit
router.post("/", isAuth, async (req, res, next) => {
  try {
    const { title, description, frequency, difficulty, status } = req.body;
    const newHabit = { title, description, frequency, difficulty, status };

    // Save in DB
    const createdHabit = await Habit.create(newHabit);
    // Response
    res.status(201).json(createdHabit);
  } catch (error) {
    next(err);
  }
});

// UPDATE one habit (admin only)
router.put("/:habitId", isAuth, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    const { title, description, frequency, difficulty, status } = req.body;
    const habitToUpdate = { title, description, frequency, difficulty, status };
    const updatedHabit = await Habit.findByIdAndUpdate({ _id: habitId }, habitToUpdate, { new: true });
    res.status(200).json(updatedHabit);
  } catch (error) {
    next(error);
  }
});

// DELETE one habit (admin only)
router.delete("/:habitId", isAuth, async (req, res, next) => {
  try {
    const { habitId } = req.params;
    await Habit.findByIdAndDelete(habitId);
    res.status(204).json(updatedHabit);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
