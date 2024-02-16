import express from 'express'
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { followController, getConnectionsNumber, isconnectedController } from '../controllers/connectionController.js';

const router = express.Router();

// routing 
// REGISTER | METHOD : POST
router.post('/follow', requireSignIn, followController);
router.get('/get-count', getConnectionsNumber);
router.get('/is-connected', isconnectedController)
// router.post('/unfollow');
// router.post('/remove');



export default router