<template>
  <div>
    <div class="flex justify-between items-start">
      <PageHeader text="My Tickets" />
      <button class="btn-primary" @click="showCreateTicket = true">
        <i class="fi fi-rr-ticket flex items-center"></i>
        Create New Ticket
      </button>
    </div>
    <div v-if="showCreateTicket">
      <LazyCreateTicket @created="fetchTickets" @close="showCreateTicket = false" />
    </div>
    <div v-if="isGridView" class="grid grid-cols-4 gap-4 h-full">
      <div v-for="status in statusOptions">
        <h5 class="font-medium text-sm mb-2 capitalize">{{ status }}</h5>
        <ul class="space-y-3">
        <li v-for="ticket in tickets.filter(ticket => ticket.status.toLowerCase() === status)" :key="ticket.id" class="block">
          <NuxtLink
              :to="`/tickets/${ticket.id}`"
              class="relative w-auto grow block p-4 rounded-2xl bg-zinc-100 border border-transparent hover:scale-105 duration-150 hover:border-black"
          >
            <h6 class="text-sm font-medium mb-1">{{ ticket.title }}</h6>
            <p class="text-xs line-clamp-2 mb-1">{{ ticket.description }}</p>
            <div class="text-right opacity-50 text-xs">{{ DateTime.fromISO(ticket.createdAt).toFormat('D') }}</div>

          </NuxtLink>
        </li>
      </ul>
      </div>
    </div>

  </div>
</template>

<script setup>
import {DateTime} from "luxon";

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

const isGridView = ref(true);

const tickets = ref([]);
const showCreateTicket = ref(false);

const fetchTickets = async () => {
  tickets.value = await $fetch('/api/tickets');
};

let statusOptions = [
    'to do',
    'in progress',
    'in review',
    'done',
];

onMounted(() => {
  fetchTickets();
});
</script>
