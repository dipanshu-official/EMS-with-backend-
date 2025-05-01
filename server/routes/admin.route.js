import express from "express";
import { body } from "express-validator";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller.js";

const router = express.Router();
// Create a new admin
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  registerAdmin
);
// Login an admin
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginAdmin
);

export default router;


