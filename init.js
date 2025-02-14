const mongoose = require("mongoose");
const User = require("./models/user.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
}

let users = [
  {
    username: "a",
    fullname: "aa",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "b",
    fullname: "b",
    gender: "female",
    dob: new Date(),
    country: "india",
    password: "1234",
  },
  {
    username: "c",
    fullname: "cc",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "d",
    fullname: "dd",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "e",
    fullname: "ee",
    gender: "female",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "f",
    fullname: "ff",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "g",
    fullname: "gg",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
  {
    username: "h",
    fullname: "hh",
    gender: "male",
    dob: new Date(),
    country: "india",
    password: "123",
  },
];

User.insertMany(users);
