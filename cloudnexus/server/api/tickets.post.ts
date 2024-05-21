import { PrismaClient } from '@prisma/client';
import { readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const newTicket = await prisma.ticket.create({
        data: {
            title: body.title,
            description: body.description,
            status: body.status ?? 'To do',
            userId: body.user,
        }
    });
    return newTicket;
});
