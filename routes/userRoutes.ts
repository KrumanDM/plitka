import express from 'express';
import { register, login } from '../controllers/userController';
import { verifyToken, AuthRequest } from '../middlewares/verifyToken';
import { Request, Response } from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, (req: AuthRequest, res: Response) => {
    res.json({ id: req.user?.id, email: req.user?.email });
  });

export default router;

