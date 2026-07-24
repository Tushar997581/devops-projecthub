import { prisma } from '../prisma/client.js';
export const categoryController = {
    list: async (_req, res, next) => {
        try {
            const categories = await prisma.category.findMany({
                orderBy: { createdAt: 'desc' }
            });
            res.json(categories);
        }
        catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        try {
            const categoryId = String(req.params.id);
            const category = await prisma.category.findUnique({
                where: { id: categoryId }
            });
            if (!category) {
                const error = new Error('Category not found');
                error.statusCode = 404;
                throw error;
            }
            res.json(category);
        }
        catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
            if (!name) {
                const error = new Error('Category name is required');
                error.statusCode = 400;
                throw error;
            }
            const existingCategory = await prisma.category.findUnique({ where: { name } });
            if (existingCategory) {
                const error = new Error('Category already exists');
                error.statusCode = 409;
                throw error;
            }
            const category = await prisma.category.create({ data: { name } });
            res.status(201).json(category);
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const categoryId = String(req.params.id);
            const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
            if (!name) {
                const error = new Error('Category name is required');
                error.statusCode = 400;
                throw error;
            }
            const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.statusCode = 404;
                throw error;
            }
            const duplicateCategory = await prisma.category.findFirst({ where: { name, NOT: { id: categoryId } } });
            if (duplicateCategory) {
                const error = new Error('Category already exists');
                error.statusCode = 409;
                throw error;
            }
            const updatedCategory = await prisma.category.update({
                where: { id: categoryId },
                data: { name }
            });
            res.json(updatedCategory);
        }
        catch (error) {
            next(error);
        }
    },
    remove: async (req, res, next) => {
        try {
            const categoryId = String(req.params.id);
            const existingCategory = await prisma.category.findUnique({ where: { id: categoryId } });
            if (!existingCategory) {
                const error = new Error('Category not found');
                error.statusCode = 404;
                throw error;
            }
            await prisma.category.delete({ where: { id: categoryId } });
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
};
