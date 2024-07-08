const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descritpion: {
    type: String,
    required: true,
  },
  startGoal: {
    type: Date,
    default: Date.now,
  },
  endGoal: {
    type: Date,
  },
  frequency: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Challenger", "Goggins"],
  },
  groups: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Habit = model("Habit", habitSchema);
module.exports = Habit;
