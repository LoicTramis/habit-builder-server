const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuth } = require("../middleware/jwt.middleware");
const User = require("../model/User.model");

const SALT = 12;

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (email === "" || password === "" || username === "") {
      res.status(400).json({ message: "invalid entry" });
      return;
    }
    // Use regex to validate the email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    // if (!emailRegex.test(email)) {
    //   res.status(400).json({ message: "Provide a valid email address." });
    //   return;
    // }

    // Use regex to validate the password format
    // const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    // if (!passwordRegex.test(password)) {
    //   res.status(400).json({
    //     message:
    //       "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    //   });
    //   return;
    // }
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    hashedPassword = bcrypt.hashSync(password, SALT);

    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const { newEmail, newUsername, _id } = createdUser;
    const user = { newUsername, newEmail, _id };

    res.status(201).json({ user: user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "You need an email and a password" });
    }

    const foundUser = await User.findOne({ email }, { email: 1, password: 1 });
    if (!foundUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const correctPassword = await bcrypt.compare(password, foundUser.password);
    if (!correctPassword) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    const payload = { id: foundUser._id };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

router.get("/verify", isAuth, async (req, res, next) => {
  try {
    const user = await User.findById(req.payload.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
