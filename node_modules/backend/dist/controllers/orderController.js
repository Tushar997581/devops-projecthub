import { prisma } from '../prisma/client.js';
export const orderController = {
    list: async (req, res, next) => {
        try {
            const orders = await prisma.order.findMany({
                where: { userId: req.user?.id },
                include: { items: { include: { product: true } } },
                orderBy: { createdAt: 'desc' }
            });
            return res.json(orders);
        }
        catch (error) {
            next(error);
        }
    },
    checkout: async (req, res, next) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const cart = await prisma.cart.findFirst({
                where: { userId },
                include: { items: { include: { product: true } } }
            });
            if (!cart || cart.items.length === 0) {
                const error = new Error('Cart is empty');
                error.statusCode = 400;
                throw error;
            }
            let totalAmount = 0;
            for (const item of cart.items) {
                if (item.product.stock < item.quantity) {
                    const error = new Error(`Insufficient stock for ${item.product.name}`);
                    error.statusCode = 400;
                    throw error;
                }
                totalAmount += Number(item.product.price) * item.quantity;
            }
            const order = await prisma.$transaction(async (tx) => {
                const createdOrder = await tx.order.create({
                    data: {
                        userId,
                        totalAmount,
                        status: 'PAID'
                    }
                });
                for (const item of cart.items) {
                    await tx.orderItem.create({
                        data: {
                            orderId: createdOrder.id,
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.product.price
                        }
                    });
                    await tx.product.update({
                        where: { id: item.productId },
                        data: { stock: item.product.stock - item.quantity }
                    });
                }
                await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
                return createdOrder;
            });
            return res.status(201).json(order);
        }
        catch (error) {
            next(error);
        }
    }
};
