import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { uploadVideoController } from '../controllers/videoControllers.js';
import { replyCommentController } from '../controllers/commentController.js';

const router = express.Router();

// routing 
// REGISTER | METHOD : POST
router.post('/upload', requireSignIn, uploadVideoController);
router.post('/reply', requireSignIn, replyCommentController)

export default router