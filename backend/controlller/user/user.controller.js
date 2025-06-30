const { User } = require("../../models/user/user.model.js");

// Function to generate a token for the user
const generateToken = async (user) => {
  try {
    const token = await user.generateAccessToken();
    return token;
  } catch (error) {
    console.log("Error generating token:", error);
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long" });
  }

  const newUser = new User({
    userName,
    password,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to handle user login
const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    console.log("Login attempt:", { userName });

    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = user.generateAccessToken();

    res.status(200).json({
      message: "Login successful",
      token,
      data: {
        id: user._id,
        userName: user.userName,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    next(err); // Pass to errorHandler
  }
};


module.exports = {
  createUser,
  login,
  generateToken,
};
