import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Function to Register on app

export const register = async (req, res) => {
  const { name, email, password, role, skills, location } = req.body;

  try {
    // Validate role
    if (role && !["user", "volunteer"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Role must be 'user' or 'volunteer'.",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Default to "user" if no role is specified
      skills: role === "volunteer" ? skills : [], // Only for volunteers
      location: role === "volunteer" ? location : undefined, // Only for volunteers
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: `${role === "volunteer" ? "Volunteer" : "User"} registered successfully.`,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        skills: newUser.skills,
        location: newUser.location,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user.",
      error: error.message,
    });
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

// function to logout a user

export const logout = async (req,res) =>{ 
  try {
    return res.cookie("token","",{maxAge:0}).json({
      message:'Logged out successfully',
      success:true
  });
  } catch (error) {
    return res.status(500).json({
      message:"Server Error",
      success:true
    })
  }
}

// function to get user profile

export const getProfile = async (req, res) => {
  try {
    let userID = req.params.id;

    const user = await User.findById(userID).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// function to update profile

export const updateProfile = async (req, res) => {
  const { name, location, skills } = req.body;

  try {
    let userID = req.id

    const user = await User.findById(userID);

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


//  function to change password

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if(!oldPassword || !newPassword){
      return res.status(401).json({message : "enter password "})
    }

    const user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash and update the new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error changing password", error: error.message });
  }
};

// function to delete user

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};
