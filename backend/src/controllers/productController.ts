import { NextFunction, Request, Response } from 'express';
import { prisma } from '../prisma/client.js';
import type { AuthRequest } from '../middleware/authMiddleware.js';

const parseNumber = (value: unknown) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number(value);
  return NaN;
};

export const productController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId = typeof req.query.categoryId === 'string' ? req.query.categoryId : undefined;
      const products = await prisma.product.findMany({
        where: categoryId ? { categoryId } : undefined,
        include: { category: true },
        orderBy: { createdAt: 'desc' }
      });

      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = String(req.params.id);
      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true }
      });

      if (!product) {
        const error = new Error('Product not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  create: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      const description = typeof req.body?.description === 'string' ? req.body.description.trim() : '';
      const price = parseNumber(req.body?.price);
      const stock = parseNumber(req.body?.stock);
      const imageUrl = typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim() : '';
      const categoryId = typeof req.body?.categoryId === 'string' ? req.body.categoryId : '';

      if (!name || !categoryId || Number.isNaN(price) || Number.isNaN(stock)) {
        const error = new Error('Invalid product payload');
        (error as Error & { statusCode?: number }).statusCode = 400;
        throw error;
      }

      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) {
        const error = new Error('Category not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          imageUrl,
          categoryId
        },
        include: { category: true }
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const productId = String(req.params.id);
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : undefined;
      const description = typeof req.body?.description === 'string' ? req.body.description.trim() : undefined;
      const price = parseNumber(req.body?.price);
      const stock = parseNumber(req.body?.stock);
      const imageUrl = typeof req.body?.imageUrl === 'string' ? req.body.imageUrl.trim() : undefined;
      const categoryId = typeof req.body?.categoryId === 'string' ? req.body.categoryId : undefined;

      const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
      if (!existingProduct) {
        const error = new Error('Product not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      if (categoryId) {
        const category = await prisma.category.findUnique({ where: { id: categoryId } });
        if (!category) {
          const error = new Error('Category not found');
          (error as Error & { statusCode?: number }).statusCode = 404;
          throw error;
        }
      }

      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
          ...(name ? { name } : {}),
          ...(description !== undefined ? { description } : {}),
          ...(Number.isNaN(price) ? {} : { price }),
          ...(Number.isNaN(stock) ? {} : { stock }),
          ...(imageUrl !== undefined ? { imageUrl } : {}),
          ...(categoryId ? { categoryId } : {})
        },
        include: { category: true }
      });

      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  },

  remove: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const productId = String(req.params.id);
      const existingProduct = await prisma.product.findUnique({ where: { id: productId } });

      if (!existingProduct) {
        const error = new Error('Product not found');
        (error as Error & { statusCode?: number }).statusCode = 404;
        throw error;
      }

      await prisma.product.delete({ where: { id: productId } });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};
