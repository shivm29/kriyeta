import express from 'express'
import { registerController, loginController } from '../controllers/authControllers.js';

const router = express.Router();

// routing 
// REGISTER | METHOD : POST
router.post('/register', registerController);
router.post('/login', loginController);


export default router