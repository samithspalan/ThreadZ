import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.controller.js';
import { login ,logout,updateprofile} from '../controllers/auth.controller.js';
import { finduser } from '../middleware/auth.middleware.js';
import { arcjetprotection } from '../middleware/arcjet.middleware.js';
// router.use(arcjetprotection);
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile',finduser,updateprofile);

router.get('/check',finduser,(req,res)=>{
    res.status(200).json(req.user);
});
export default router;