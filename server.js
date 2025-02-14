const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const mongoose = require("mongoose");
const User = require("./models/user.js");
const authMiddleware = require("./middleware/auth.js");

// setting the view engine
app.set("view engine", "ejs");

// adding the path to views folder
app.set("views", path.join(__dirname, "/views"));

// adding path to static files
app.use(express.static(path.join(__dirname, "public")));

// for parsing the req.body to readable format
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ⭐

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// MONGOOSE SERVER=========================================

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
}

// ROUTES=======================================================

app.get("/", (req, res) => {
  res.render("signIn");
});

app.post("/", async (req, res) => {
  try {
    let { username, fullname, gender, dob, country, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send("user already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      username: username,
      fullname: fullname,
      gender: gender,
      dob: dob,
      country: country,
      password: hashedPassword,
    });

    await newUser.save();

    res.redirect("/login");
  } catch (err) {
    res.send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("invalid username/password");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.cookie("token", token, { httpOnly: true });

    res.redirect(`/${username}/dashboard`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/:username/dashboard", authMiddleware, async (req, res) => {
  let { username } = req.params;
  if (username !== req.user.username) {
    return res.send("unauthorized access");
  }
  let users = await User.find();
  let user1 = await User.findOne({ username });
  res.render("dashboard", { user1, users });
});

// app.get("/search", async (req, res) => {
//   let { username, origUsername } = req.query;
//   let newUser = await User.findOne({ username });
//   res.render("search", { newUser, origUsername });
// });

app.get("/search", async (req, res) => {
  let { username, origUsername } = req.query;
  let newUser = await User.findOne({ username });
  res.render("search", { newUser, origUsername });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// SERVER START=====================================================

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
