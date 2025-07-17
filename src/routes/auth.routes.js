import { Router } from 'express';
import authorizationController from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', authorizationController.login);

export default router;