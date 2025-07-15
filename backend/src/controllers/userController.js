const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.SECRET_KEY;

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      password,
      role: role || "member"
    });

    await newUser.save();

    // Use aggregation to get user with only board _ids
    const userWithBoardIds = await User.aggregate([
      { $match: { _id: newUser._id } },
      {
        $lookup: {
          from: "boards", // collection name
          localField: "board",
          foreignField: "_id",
          as: "boards"
        }
      },
      {
        $project: {
          first_name: 1,
          last_name: 1,
          email: 1,
          role: 1,
          boards: { $map: { input: "$boards", as: "b", in: "$$b._id" } } // Only board _ids
        }
      }
    ]);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithBoardIds[0] || {},
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signup failed",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};