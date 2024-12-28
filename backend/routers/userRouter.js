import express from 'express'
import { getUsers } from '../controllers/userController.js';
import { isLogin } from '../middleware/isLogin.js';
const router = express.Router();

router.get('/test', (req,res)=>{
    return res.send("Router")
});

router.get('/', isLogin, getUsers);

export default router;