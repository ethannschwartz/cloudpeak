import {PrismaClient} from "@prisma/client";
import {readBody} from "h3";

export default function useComment(comment) {

    async function postComment(ticket) {
        await $fetch('/api/tickets', {
            method: 'POST',
            body: {
                ticketId: ticket.id,
                content: ticket.value,
                userId: useState('user').value?.id,
            }
        });
    }

    return {
        postComment,
    }
}