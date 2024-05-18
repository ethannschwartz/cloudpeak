import { PrismaClient } from '@prisma/client';
import { readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const updatedTicket = await prisma.ticket.update({
        where: { id: body.id },
        data: {
            title: body.title,
            description: body.description,
            status: body.status ?? 'To do',
            userId: body.userId,
        }
    });
    return updatedTicket;
});
