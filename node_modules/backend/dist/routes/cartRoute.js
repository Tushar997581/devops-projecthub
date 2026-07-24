import { Router } from 'express';
import { cartController } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', authMiddleware, cartController.getCart);
router.post('/items', authMiddleware, cartController.addItem);
router.put('/items/:id', authMiddleware, cartController.updateItem);
router.delete('/items/:id', authMiddleware, cartController.removeItem);
export default router;
