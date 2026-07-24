import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService.js';
import { validationResult } from 'express-validator';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await authService.register(req.body);
      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await authService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  me: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await authService.me(req.user.id);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
};
