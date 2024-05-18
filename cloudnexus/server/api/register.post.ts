// server/api/submit.post.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { defineEventHandler, readBody, sendError } from 'h3';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        // Hash the password
        const hashedPassword = await hash(body.password, saltRounds);

        // Save the form data to the database with hashed password
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

        return {
            status: 'success',
            user: newUser,
        };
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                // Handle unique constraint violation on email
                return sendError(event, createError({ statusCode: 400, statusMessage: 'Email is already in use' }));
            }
        }

        // Handle other errors
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
