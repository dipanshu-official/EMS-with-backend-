import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import SuperAdmin from "../models/superAdmin.model.js";

// Register a new super admin
export const registerSuperAdmin = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // Destructure the request body
    const { name, email, password } = req.body;

    // Validate the input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the super admin already exists
    const existingSuperAdmin = await SuperAdmin.findOne({ email });
    if (existingSuperAdmin) {
      return res.status(400).json({ message: "Super admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new super admin
    const newSuperAdmin = new SuperAdmin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the super admin to the database
    await newSuperAdmin.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newSuperAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the response header
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(201).json({ message: "Super admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
// Login a super admin

export const loginSuperAdmin = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    // Destructure the request body
    const { email, password } = req.body;

    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the super admin exists
    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the response header
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).json({ message: "Super admin logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}