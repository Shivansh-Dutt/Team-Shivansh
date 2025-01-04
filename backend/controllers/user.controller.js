import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const register = async (req, res) => {
  const { name, email, password, role, skills, location } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(401).json({ message: "Fill all data" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      skills,
      location,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// function to login a user

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check both data are given
    if (!email || !password) {
      return res.status(401).json({
        message: "Invalid Data",
        success: true,
      });
    }

    dotenv.config();

    // check for user in db
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    // check password is matching
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // create a token
    const token = await jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, location, skills } = req.body;

  try {
    const user = await User.findById(req.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.location = location || user.location;
    user.skills = skills || user.skills;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
