import express from 'express';
import { body } from 'express-validator';
import { loginSuperAdmin, registerSuperAdmin } from  '../controllers/superAdmin.controller.js';

const router = express.Router();
// Create a new super admin
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  registerSuperAdmin
);
// Login a super admin  
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginSuperAdmin
);
export default router;