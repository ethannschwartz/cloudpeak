import { PrismaClient } from '@prisma/client';
import { readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await prisma.ticket.delete({
        where: { id: body.id }
    });
    return { status: 'success' };
});
