const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    habits: [
        {
            type: Schema.Types.ObjectId,
            ref: "Habit",
        },
    ],
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Group = model("Group", groupSchema);
module.exports = Group;
