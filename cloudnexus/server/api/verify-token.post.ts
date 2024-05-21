// server/api/verify-token.post.ts
import { defineEventHandler, readBody, createError, sendError } from 'h3';
import { verifyToken } from '~/utils/jwt-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = body.token;

    if (!token) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
    }

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'Unauthorized' }));
    }

    // Fetch user from the database using the decoded token info
    const user = await prisma.user.findUnique({
        where: { id: decodedToken.userId }
    });

    if (!user) {
        return sendError(event, createError({ statusCode: 401, statusMessage: 'User not found' }));
    }

    // Remove sensitive information if necessary
    const { password, ...userWithoutPassword } = user;

    return { status: 'success', user: userWithoutPassword };
});
