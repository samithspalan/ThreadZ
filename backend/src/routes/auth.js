import express from 'express';
const router = express.Router();
import { signup, login, logout, updateprofile, checkAuthStatus } from '../controllers/auth.controller.js';
import { finduser } from '../middleware/auth.middleware.js';
import { arcjetprotection } from '../middleware/arcjet.middleware.js';
// router.use(arcjetprotection);
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile',finduser,updateprofile);

router.get('/check', checkAuthStatus);

export default router;