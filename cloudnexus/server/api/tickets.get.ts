import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const tickets = await prisma.ticket.findMany();
    return tickets;
});
