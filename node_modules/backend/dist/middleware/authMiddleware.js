import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { prisma } from '../prisma/client.js';
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, env.jwtSecret);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, firstName: true, lastName: true, email: true, role: true }
        });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
