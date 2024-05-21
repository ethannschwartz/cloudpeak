import { PrismaClient } from '@prisma/client';
import { readBody } from 'h3';
import {verifyToken} from "~/utils/jwt-auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if(!!body.user) {
        const newTicket = await prisma.ticket.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status ?? 'To do',
                userId: body.user.id,
            }
        });
        return newTicket;
    }
});
