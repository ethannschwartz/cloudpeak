<template>
  <div class="py-4 border-b flex w-full justify-between items-start">
    <div class="duration-150 max-w-xs w-full">
      <h5 class="font-medium">
        <NuxtLink :to="`/tickets/${ticket.id}`" class="hover:underline underline-offset-4">
          {{ ticket.title }}
        </NuxtLink>
        <span class="ml-2 opacity-50 text-xs">#{{ ticket.id.substring(0,7) }}</span>
      </h5>
      <p class="duration-150 opacity-75 text-xs max-w-xs line-clamp-1" v-html="ticket.description"></p>
    </div>
    <div class="w-36">
      <span class="text-sm opacity-40">{{ DateTime.fromISO(ticket.updatedAt).toFormat('DD') }}</span>
    </div>
    <div class="w-36">
      <span class="text-sm opacity-40">{{ DateTime.fromISO(ticket.createdAt).toFormat('DD') }}</span>
    </div>
    <div class="w-32 flex justify-end">
      <StatusDropdown :ticket="ticket" @select="handleStatusUpdate(ticket, $event)" />
    </div>
  </div>
</template>

<script setup>
import {DateTime} from "luxon";

const props = defineProps(['ticket']);
const { updateTicketStatus } = useTicket();

const handleStatusUpdate = (ticket, event) => {
  ticket.status = event;
  updateTicketStatus(ticket, event);
}
</script>