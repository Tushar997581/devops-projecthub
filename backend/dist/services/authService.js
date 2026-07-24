import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client.js';
import { env } from '../config/env.js';
export class AuthService {
    async register(input) {
        const existingUser = await prisma.user.findUnique({ where: { email: input.email } });
        if (existingUser) {
            const error = new Error('Email already registered');
            error.statusCode = 409;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const user = await prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: hashedPassword,
                role: 'USER'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
        const token = this.generateToken(user.id);
        return { user, token };
    }
    async login(input) {
        const user = await prisma.user.findUnique({ where: { email: input.email } });
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(input.password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = this.generateToken(user.id);
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token
        };
    }
    async me(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        return user;
    }
    generateToken(userId) {
        return jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: '7d' });
    }
}
export const authService = new AuthService();
