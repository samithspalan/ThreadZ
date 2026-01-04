import express from 'express';
const router = express.Router();
import { signup } from '../controllers/auth.controller.js';
import { login ,logout} from '../controllers/auth.controller.js';

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/about', (req, res) => {
    res.send('About page');
});
export default router;