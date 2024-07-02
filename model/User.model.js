const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    habits: [
        {
            type: Schema.Types.ObjectId,
            ref: "Habit",
        },
    ],
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: "Group",
        },
    ],
});

const User = model("User", userSchema);
module.exports = User;
