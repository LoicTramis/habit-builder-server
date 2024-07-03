const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  habits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Habit",
    },
  ],
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Group = model("Group", groupSchema);
module.exports = Group;
