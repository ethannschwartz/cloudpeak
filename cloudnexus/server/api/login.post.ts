// server/api/login.post.ts
import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, sendError } from 'h3';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Find the user by email
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        });

        if (!user) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid email or password' }));
        }

        // Compare the password
        const isPasswordValid = await compare(body.password, user.password);
        if (!isPasswordValid) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid email or password' }));
        }

        // Remove the password from the user object
        const { password, ...userWithoutPassword } = user;

        return {
            status: 'success',
            user: userWithoutPassword
        };
    } catch (error) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
