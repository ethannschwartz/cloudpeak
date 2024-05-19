<template>
  <div>
    <div class="max-w-full w-full flex justify-between items-start">
      <PageHeader text="My Tickets" />
      <div class="flex items-center gap-3">
        <button class="btn-secondary" @click="isGridView = !isGridView">
          <i class="fi flex items-center" :class="isGridView ? 'fi-rr-grid' : 'fi-rr-list'"></i>
          {{ isGridView ? 'Grid' : 'List' }} View
        </button>
        <button class="btn-primary" @click="showCreateTicket = true">
          <i class="fi fi-rr-ticket flex items-center"></i>
          Create New Ticket
        </button>
        <input type="text" class="input-primary" placeholder="Search tickets" v-model="searchInput">
      </div>
    </div>
    <div v-if="showCreateTicket">
      <LazyCreateTicket @created="fetchTickets" @close="showCreateTicket = false" />
    </div>
    <div v-if="isGridView" class="grid grid-cols-4 gap-4 h-full">
      <div
          v-for="status in statusOptions"
          class="h-full"
          @drop.prevent="handleStatusUpdate($event, status)"
          @dragover.prevent="handleDragOver(status)"
          @dragleave.prevent="handleDragLeave"
      >
        <h5 class="sticky top-0 pb-2 pt-4 bg-white border-b z-30 font-medium text-sm mb-2 capitalize">{{ status }}</h5>
        <ul class="space-y-3 border min-h-full" :class="isDraggedOver == status ? 'rounded-xl border-black border-dashed' : 'border-transparent'">
          <li
              v-for="ticket in filteredTickets.filter(ticket => ticket.status.toLowerCase() === status)"
              :key="ticket.id"
              class="block"
              @dragstart="handleDragStart(ticket, ticket)"
          >
            <NuxtLink
                :to="`/tickets/${ticket.id}`"
                :draggable="true"
                class="relative w-auto grow block p-4 rounded-2xl bg-zinc-100 border border-transparent hover:scale-105 duration-150 hover:border-black"
            >
              <h6 class="text-sm font-medium mb-1">{{ ticket.title }}</h6>
              <p class="text-xs line-clamp-2 mb-1" v-html="ticket.description"></p>
              <div class="text-right opacity-50 text-xs">{{ DateTime.fromISO(ticket.createdAt).toFormat('D') }}</div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <ul>
        <li class="sticky top-0 bg-white z-50 flex w-full items-center justify-between border-b pt-4 pb-2">
          <span class="max-w-xs w-full shrink-1 font-medium text-xs opacity-75">Ticket</span>
          <span class="w-36 font-medium text-xs opacity-75">Updated At</span>
          <span class="w-36 font-medium text-xs opacity-75">Created At</span>
          <span class="w-32 font-medium text-xs opacity-75 text-right">Status</span>
        </li>
        <li v-for="ticket in filteredTickets">
          <LazyTicketItem :ticket="ticket" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {DateTime} from "luxon";
const { updateTicketStatus } = useTicket();

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

const isGridView = ref(false);
const searchInput = ref('');

const tickets = ref([]);
const filteredTickets = computed(() => {
  if (searchInput.value?.length) {
    return tickets.value
        ?.filter(ticket => ticket.title?.toLowerCase()?.includes(searchInput.value.toLowerCase()))
        ?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return tickets.value?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
});

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

const draggedTicket = ref(null);

const handleDragStart = (event, ticket) => {
  draggedTicket.value = ticket;
  event.dataTransfer.effectAllowed = 'move';
};

const handleStatusUpdate = (event, status) => {
  if (draggedTicket.value) {

    draggedTicket.value.status = status;

    updateTicketStatus(draggedTicket.value, status);

    draggedTicket.value = null;
    isDraggedOver.value = false;
  }
};

const isDraggedOver = ref(false);

const handleDragLeave = () => {
  isDraggedOver.value = false;
}

const handleDragOver = (status) => {
  isDraggedOver.value = status;
}
</script>
