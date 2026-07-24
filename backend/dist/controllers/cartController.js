import { prisma } from '../prisma/client.js';
const parseQuantity = (value) => {
    if (typeof value === 'number')
        return value;
    if (typeof value === 'string')
        return Number(value);
    return NaN;
};
export const cartController = {
    getCart: async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            let cart = await prisma.cart.findFirst({ where: { userId }, include: { items: { include: { product: true } } } });
            if (!cart) {
                cart = await prisma.cart.create({ data: { userId }, include: { items: { include: { product: true } } } });
            }
            return res.json(cart);
        }
        catch (error) {
            next(error);
        }
    },
    addItem: async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const productId = typeof req.body?.productId === 'string' ? req.body.productId : '';
            const quantity = parseQuantity(req.body?.quantity);
            if (!userId || !productId || Number.isNaN(quantity) || quantity <= 0) {
                const error = new Error('Invalid cart payload');
                error.statusCode = 400;
                throw error;
            }
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) {
                const error = new Error('Product not found');
                error.statusCode = 404;
                throw error;
            }
            let cart = await prisma.cart.findFirst({ where: { userId } });
            if (!cart) {
                cart = await prisma.cart.create({ data: { userId } });
            }
            const existingItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
            if (existingItem) {
                const updatedItem = await prisma.cartItem.update({
                    where: { id: existingItem.id },
                    data: { quantity: existingItem.quantity + quantity }
                });
                return res.status(200).json(updatedItem);
            }
            const item = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            });
            return res.status(201).json(item);
        }
        catch (error) {
            next(error);
        }
    },
    updateItem: async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const itemId = String(req.params.id);
            const quantity = parseQuantity(req.body?.quantity);
            if (!userId || Number.isNaN(quantity) || quantity <= 0) {
                const error = new Error('Invalid quantity');
                error.statusCode = 400;
                throw error;
            }
            const cart = await prisma.cart.findFirst({ where: { userId } });
            if (!cart) {
                const error = new Error('Cart not found');
                error.statusCode = 404;
                throw error;
            }
            const existingItem = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
            if (!existingItem) {
                const error = new Error('Cart item not found');
                error.statusCode = 404;
                throw error;
            }
            const updatedItem = await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
            return res.json(updatedItem);
        }
        catch (error) {
            next(error);
        }
    },
    removeItem: async (req, res, next) => {
        try {
            const userId = req.user?.id;
            const itemId = String(req.params.id);
            const cart = await prisma.cart.findFirst({ where: { userId } });
            if (!cart) {
                const error = new Error('Cart not found');
                error.statusCode = 404;
                throw error;
            }
            const existingItem = await prisma.cartItem.findFirst({ where: { id: itemId, cartId: cart.id } });
            if (!existingItem) {
                const error = new Error('Cart item not found');
                error.statusCode = 404;
                throw error;
            }
            await prisma.cartItem.delete({ where: { id: itemId } });
            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
};
