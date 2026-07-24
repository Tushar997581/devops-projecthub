import { Router } from 'express';

const router = Router();

router.post('/login', (_req, res) => {
  res.json({ message: 'Auth login placeholder' });
});

router.post('/register', (_req, res) => {
  res.json({ message: 'Auth register placeholder' });
});

export default router;
