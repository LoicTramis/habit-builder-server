const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
require("./../config/dbConnect");
const bcrypt = require("bcryptjs");

const Habit = require("./../model/Habit.model");
const Group = require("./../model/Group.model");
const User = require("./../model/User.model");
const password = bcrypt.hashSync("password", 12);

const habits = [
  {
    title: "Daily Meditation",
    description: "Practice mindfulness meditation for a few minutes every day to reduce stress and improve focus.",
    frequency: "Daily",
    difficulty: "Medium",
  },
  {
    title: "Morning Jog",
    description: "Jog every morning to enhance physical fitness and boost energy levels.",
    frequency: "Daily",
    difficulty: "Hard",
  },
  {
    title: "Read Books",
    description: "Read a few pages of a book daily to expand knowledge and improve mental acuity.",
    frequency: "Daily",
    difficulty: "Medium",
  },
  {
    title: "Healthy Eating",
    description: "Eat balanced meals rich in nutrients to improve overall health.",
    frequency: "Daily",
    difficulty: "Medium",
  },
  {
    title: "Learn a New Skill",
    description: "Dedicate time to learning a new skill or hobby.",
    frequency: "Daily",
    difficulty: "Hard",
  },
  {
    title: "Gratitude Journal",
    description: "Write down things you are grateful for to enhance positive thinking.",
    frequency: "Daily",
    difficulty: "Easy",
  },
];
const groups = [
  {
    name: "Wellness Warriors",
    description: "A group dedicated to improving overall wellness through various healthy habits.",
    admin: "Louise",
    // habits: ["Daily Meditation", "Healthy Eating"],
    // members: ["User123", "User101"],
  },
  {
    name: "Fitness Enthusiasts",
    description: "For individuals committed to maintaining high physical fitness levels.",
    admin: "Tina",
    // habits: ["Morning Jog"],
    // members: ["User456"],
  },
  {
    name: "Book Lovers",
    description: "A community for those who enjoy reading and discussing books.",
    admin: "Tina",
    // habits: ["Read Books"],
    // members: ["User789"],
  },
  {
    name: "Goggins maniac",
    description: "STAY HARD MOTHERFUCKER.",
    admin: "Tina",
    // habits: ["Read Books"],
    // members: ["User789"],
  },
  {
    name: "Chad in progress",
    description: "Red pilled, becoming giga chad is the only way (not incel at all).",
    admin: "Chadwick",
    // habits: ["Read Books"],
    // members: ["User789"],
  },
];
const users = [
  {
    username: "Louise",
    email: "louise.belcher@bob.com",
    password,
  },
  {
    username: "Jean",
    email: "jean.dujardin@bob.com",
    password,
  },
  {
    username: "Mickael",
    email: "mickael.jordan@bob.com",
    password,
  },
  {
    username: "Chadwick",
    email: "chadwick.boseman@bob.com",
    password,
  },
  {
    username: "Tina",
    email: "tina.belcher@bob.com",
    password,
  },
  {
    username: "Goggins",
    email: "david.goggins@stayhard.com",
    password,
  },
  {
    username: "Entropy",
    email: "entropy.cosmic@mail.com",
    password,
  },
  {
    username: "Eternity",
    email: "eternity.cosmic@mail.com",
    password,
  },
  {
    username: "Infinity",
    email: "infinity.cosmic@mail.com",
    password,
  },
  {
    username: "Death",
    email: "death.cosmic@mail.com",
    password,
  },
];

seed();

async function seed() {
  try {
    // Delete and create user
    const deletedUsers = await User.deleteMany();
    console.log(`❌ Deleted ${deletedUsers.deletedCount} users.`);
    const createdUsers = await User.create(users);
    console.log(`✔  Created ${createdUsers.length} users.`);

    // Delete habits and groups
    const deletedHabits = await Habit.deleteMany();
    const deletedGroups = await Group.deleteMany();
    console.log(`❌ Deleted ${deletedHabits.deletedCount} habits.`);
    console.log(`❌ Deleted ${deletedGroups.deletedCount} groups.`);

    // GENERATE HABITS
    for (const habit of habits) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      habit.creator = randomUser._id;
    }
    const createdHabits = await Habit.create(habits);
    console.log(`✔  Created ${createdHabits.length} habits.`);

    // GENERATE GROUPS
    for (const group of groups) {
      // Generate admin user
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      group.admin = randomUser._id;
      // Generate HABITS
      group.habits = [];
      const randomHabitLength = Math.ceil(Math.random() * 3);

      for (let index = 0; index < randomHabitLength; index++) {
        const randomHabit = createdHabits[Math.floor(Math.random() * createdHabits.length)];
        group.habits.push(randomHabit._id);
      }
      // Generate MEMBERS
      group.members = [];
      const randomMembersLength = Math.ceil(Math.random() * 10);

      for (let index = 0; index < randomMembersLength; index++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        group.members.push(randomUser._id);
      }
    }
    const createdGroups = await Group.create(groups);
    console.log(`✔  Created ${createdGroups.length} groups.`);

    const deleted2Habits = await Habit.deleteMany();
    console.log(`❌ Deleted ${deleted2Habits.deletedCount} habits.`);

    // UPDATE HABIT
    for (const habit of habits) {
      const randomGroupLength = Math.ceil(Math.random() * 6);
      habit.groups = [];
      // Generate GROUPS
      for (let index = 0; index < randomGroupLength; index++) {
        const randomGroup = createdGroups[Math.floor(Math.random() * createdGroups.length)];
        habit.groups.push(randomGroup._id);
      }
    }
    const updatedHabit = await Habit.create(habits);
    console.log(`✔  Created ${updatedHabit.length} habits.`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Seeding done.");
    process.exit(1);
  }
}
