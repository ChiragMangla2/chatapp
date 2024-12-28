import express from 'express';
import { createUser, loginUser } from '../controllers/authController.js';
const router = express.Router();

router.get('/', (req,res)=>{
    return res.send("Router")
});

router.post('/login', loginUser);
router.post('/signup', createUser);

export default router;