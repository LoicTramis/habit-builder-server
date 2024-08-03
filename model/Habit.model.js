const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const habitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: function () {
      return this.startDate.getTime() + 7 * 1000 * 60 * 60 * 24;
    },
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
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Habit = model("Habit", habitSchema);
module.exports = Habit;
