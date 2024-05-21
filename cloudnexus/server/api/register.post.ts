// server/api/register.post.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { defineEventHandler, readBody, sendError, createError } from 'h3';
import { hash } from 'bcrypt';
import { signToken } from '~/utils/jwt-auth';

const prisma = new PrismaClient();
const saltRounds = 10;

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (!body.email || !body.password || !body.firstName || !body.lastName) {
            return sendError(event, createError({ statusCode: 400, statusMessage: 'Missing required fields' }));
        }

        const hashedPassword = await hash(body.password, saltRounds);

        const newUser = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                companyName: body.companyName,
                companySize: body.companySize,
                expenses: body.expenses,
                cloudServices: body.cloudServices,
                password: hashedPassword,
            },
        });

        const token = signToken({
            ...newUser,
        });

        event.res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

        return { status: 'success', user: newUser, token };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                return sendError(event, createError({ statusCode: 400, statusMessage: 'Email is already in use' }));
            }
        }

        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    } finally {
        await prisma.$disconnect();
    }
});
