import express from "express";
import { body } from "express-validator";
import { loginEmployee, registerEmployee } from "../controllers/employees.controller.js";

const router = express.Router();

// Create a new employee

router.post("/register", [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
] , registerEmployee);
// Login an employee
router.post("/login", [
  body("email").isEmail().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
], loginEmployee );

export default router;
