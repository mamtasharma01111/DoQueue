const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('../models/user/user.model');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const userName = await question("Enter username: ");
  const password = await question("Enter password: ");
  const role = await question("user role: ");

  try {
    const newUser = new User({ userName, password, role });
    await newUser.save();
    console.log("User created successfully:", newUser);
  } catch (err) {
    console.error("Error creating user:", err.message);
  } finally {
    rl.close();
    mongoose.disconnect();
  }
}

main();