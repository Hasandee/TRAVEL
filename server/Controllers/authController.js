import User from "../Models/userModel.js";
import createError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Register User
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new createError("User is already registered", 409));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "90d" });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
      user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return next(new createError("User not found!", 404));

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return next(new createError("Invalid email or password", 401));

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "90d" });

    res.status(200).json({
      status: "success",
      message: "Logged in successfully",
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new createError("Email not found!", 404));

    const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      html: `<p>Hello ${user.name},</p>
        <p>You requested a password reset. Click 
        <a href="http://localhost:3001/reset-password/${resetToken}" 
          style="color: blue; text-decoration: underline;">
          here
        </a> to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "success", message: "Password reset link sent to your email." });
  } catch (error) {
    next(error);
  }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token and password are required" });
    }

    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ status: "success", message: "Password reset successful! You can now log in." });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
