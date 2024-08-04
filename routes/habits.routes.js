const router = require("express").Router();
const { getToken, isAuth } = require("../middleware/jwt.middleware");
const Habit = require("../model/Habit.model");

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

// Get all habits of one user
router.get("/in", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const habits = await Habit.find({
      $or: [
        {
          creator: userId,
        },
        {
          members: {
            $elemMatch: {
              $eq: userId,
            },
          },
        },
      ],
    })
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
    const habit = await Habit.find({ _id: habitId })
      .populate({
        path: "creator",
        select: "-password",
      })
      .populate({ path: "members", select: "-password" });
    res.status(200).json(habit);
  } catch (error) {
    next(error);
  }
});

// Create one habit
router.post("/", getToken, async (req, res, next) => {
  try {
    const creator = req.payload.id;
    const { title, description, frequency, difficulty, startDate, endDate } = req.body;
    let newHabit = {
      title,
      description,
      frequency,
      creator,
      difficulty,
    };

    if (startDate === "") {
      newHabit.startDate = undefined;
    }
    if (endDate === "") {
      newHabit.endDate = undefined;
    }

    // Save in DB
    const createdHabit = await Habit.create(newHabit);
    await createdHabit.populate({
      path: "creator",
      select: "-password",
    });
    // Response
    res.status(201).json(createdHabit);
  } catch (error) {
    next(error);
  }
});

// Update one habit (creator only)
router.put("/:habitId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { habitId } = req.params;
    const { title, description, frequency, difficulty, startDate, endDate } = req.body;
    let habitToUpdate = {
      title,
      description,
      frequency,
      difficulty,
      startDate,
      endDate,
    };

    if (!startDate) {
      habitToUpdate.startDate = undefined;
    }
    if (!endDate) {
      habitToUpdate.endDate = undefined;
    }

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId, creator: userId },
      habitToUpdate,
      { new: true }
    );
    await updatedHabit.populate({
      path: "creator",
      select: "-password",
    });
    res.status(200).json(updatedHabit);
  } catch (error) {
    next(error);
  }
});

// Join a habit in members array
router.patch("/add/:habitId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { habitId } = req.params;

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId },
      { $push: { members: userId } },
      { new: true }
    );
    await updatedHabit.populate({
      path: "creator",
      select: "-password",
    });
    res.status(200).json(updatedHabit);
  } catch (error) {
    next(error);
  }
});
// Remove the user from the habit
router.patch("/remove/:habitId", getToken, async (req, res, next) => {
  try {
    const userId = req.payload.id;
    const { habitId } = req.params;

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: habitId },
      { $pull: { members: userId } },
      { new: true }
    );
    await updatedHabit.populate({
      path: "creator",
      select: "-password",
    });
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

    const deletedHabit = await Habit.findOneAndDelete({
      _id: habitId,
      creator: userId,
    });

    res.status(202).json(deletedHabit);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
