// server/api/login.post.ts
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import { signToken } from '~/utils/jwt-auth';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.email || !body.password) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing required fields' }));
        }

        const user = await prisma.user.findUnique({ where: { email: body.email } });

        if (!user) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid email or password' }));
        }

        const isPasswordValid = await compare(body.password, user.password);
        if (!isPasswordValid) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid email or password' }));
        }

        const token = signToken({
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            companyName: user.companyName,
            companySize: user.companySize,
            cloudExpenses: user.expenses,
            cloudServices: user.cloudServices,
        });

        const { password, ...userWithoutPassword } = user;

        event.res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

        return { status: 'success', user: userWithoutPassword, token };
    } catch (error) {
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    } finally {
        await prisma.$disconnect();
    }
});
