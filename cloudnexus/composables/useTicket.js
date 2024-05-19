export default function useTicket() {
    const route = useRoute();

    const updateTicketStatus = async (ticket, status) => {
        ticket.status = status;
        await $fetch('/api/tickets', {
            method: 'PUT',
            body: {
                id: ticket?.id,
                title: ticket?.title,
                description: ticket?.description,
                status: status ?? 'To do',
                userId: useState('user')?.id,
            }
        });
    }

    const fetchTicket = async (ticket) => {
        const tickets = await $fetch('/api/tickets', {
            method: "get",
        });
        ticket.value = tickets.find(t => t.id === route.params.id);
    };

    const deleteTicket = async () => {
        let isConfirmed = window.confirm('Are you sure you want to delete this ticket?');

        if(isConfirmed) {
            await $fetch('/api/tickets', {
                method: 'DELETE',
                body: {id: ticket.value.id}
            });
            navigateTo('/tickets');
        }
    };


    return {
        updateTicketStatus,
        fetchTicket,
        deleteTicket,
    }
}