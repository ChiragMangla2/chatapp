import express from 'express';
import { getMsg } from '../controllers/msgController.js';
import { isLogin } from '../middleware/isLogin.js';
const router = express.Router();

router.get('/', isLogin, getMsg);

export default router;