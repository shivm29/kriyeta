import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { replyCommentController, uploadCommentController } from '../controllers/commentController.js';

const router = express.Router();

// routing 
// REGISTER | METHOD : POST
router.post('/upload', requireSignIn, uploadCommentController);
router.post('/reply', requireSignIn, replyCommentController)

export default router