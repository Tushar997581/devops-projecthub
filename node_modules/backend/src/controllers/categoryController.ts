import { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma/client.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

export const categoryController = {
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { createdAt: 'desc' }
      });

      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = String(req.params.id);
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        const error = new Error('Category not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      res.json(category);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

      if (!name) {
        const error = new Error('Category name is required');
        (error as Error & { statusCode?: number }).statusCode = 400;
        throw error;
      }

      const existingCategory = await prisma.category.findUnique({ where: { name } });
      if (existingCategory) {
        const error = new Error('Category already exists');
        (error as Error & { statusCode?: number }).statusCode = 409;
        throw error;
      }

      const category = await prisma.category.create({ data: { name } });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const categoryId = String(req.params.id);
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

      if (!name) {
        const error = new Error('Category name is required');
        (error as Error & { statusCode?: number }).statusCode = 400;
        throw error;
      }

      const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!existingCategory) {
        const error = new Error('Category not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      const duplicateCategory = await prisma.category.findFirst({ where: { name, NOT: { id: categoryId } } });
      if (duplicateCategory) {
        const error = new Error('Category already exists');
        (error as Error & { statusCode?: number }).statusCode = 409;
        throw error;
      }

      const updatedCategory = await prisma.category.update({
        where: { id: categoryId },
        data: { name }
      });

      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const categoryId = String(req.params.id);
      const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });

      if (!existingCategory) {
        const error = new Error('Category not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      await prisma.category.delete({ where: { id: categoryId } });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
