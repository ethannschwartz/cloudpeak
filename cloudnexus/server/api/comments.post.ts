import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody, createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { content, ticketId, userId } = body;

    const newComment = await prisma.comment.create({
        data: {
            content,
            ticketId,
            userId,
        },
    });

    return newComment;
});
