<template>
  <div class="grid grid-cols-4 gap-4 h-full">
    <div
        v-for="status in statusOptions"
        class="h-full"
        @drop.prevent="handleStatusUpdate($event, status)"
        @dragover.prevent="handleDragOver(status)"
        @dragleave.prevent="handleDragLeave"
    >
      <h5 class="sticky top-0 pb-2 pt-4 bg-white border-b z-30 font-medium text-sm mb-2 capitalize">{{ status }}</h5>
      <ul class="space-y-3 border h-full duration-150 rounded-2xl" :class="isDraggedOver === status ? 'border-black border-dashed' : 'border-transparent'">
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
        <li :class="status === isDraggedOver ? 'opacity-100' : 'opacity-0'" class="duration-150 p-12 scale-95 rounded-2xl bg-zinc-100"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {DateTime} from "luxon";
defineProps(['filteredTickets', 'statusOptions']);

const { updateTicketStatus } = useTicket();

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