import express from 'express';
import { finduser } from '../middleware/auth.middleware.js';
import { getchats, getcontacts,getmessages,sendmessage } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/contacts',finduser,getcontacts);
router.get('/chats',finduser,getchats);
router.post('/send/:id',finduser,sendmessage);
router.get('/:userId',finduser,getmessages);     
export default router;