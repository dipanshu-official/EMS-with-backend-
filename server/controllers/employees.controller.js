import { validationResult } from "express-validator";
import Employee from "../models/employees.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const registerEmployee = async (req, res) => {
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

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
    });

    // Save the employee to the database
    await newEmployee.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newEmployee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Set the token in the response header
    res.setHeader("Authorization", `Bearer ${token}`);
    

    res.status(201).json({ message: "Employee registered successfully" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const loginEmployee = async (req, res) => {
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

    // Check if the employee exists
    const existingEmployee = await Employee.findOne({ email });
    if (!existingEmployee) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, existingEmployee.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: existingEmployee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: "Login successful" ,user:existingEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}