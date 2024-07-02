const mongoose = require("mongoose");
const { Schema } = mongoose;

const habitSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    descritpion: {
        type: String,
        require: true,
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
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard", "Challenger", "Goggins"],
    },
    status: {
        type: String,
        enum: ["Incoming", "Ongoing", "Done"],
    },
});

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
