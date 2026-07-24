import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware, orderController.list);
router.post('/checkout', authMiddleware, orderController.checkout);

export default router;
