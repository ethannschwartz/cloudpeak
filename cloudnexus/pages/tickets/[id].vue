<template>
  <div v-if="ticket">
    <NuxtLink to="/tickets" class="w-fit opacity-50 hover:opacity-100 duration-150 font-medium flex items-center gap-1">
      <i class="fi flex items-center fi-rr-arrow-small-left"></i>
      Back
    </NuxtLink>
    <PageHeader :text="ticket.title" :subtitle="ticket.subtitle">
      <template #options>
        <LazyStatusDropdown @select="updateTicketStatus(ticket, $event)" :ticket="ticket"  />
      </template>
      <template #subtitle>
        <div class="flex items-center gap-3">
          <span class="text-sm opacity-50">#{{ ticket.id.substring(0,7) }}</span>•
          <span class="text-sm opacity-50">Created {{ DateTime.fromISO(ticket.createdAt).toFormat('f') }}</span>•
          <span class="text-sm opacity-50">Updated {{ DateTime.fromISO(ticket.updatedAt).toFormat('f') }}</span>
        </div>
      </template>
    </PageHeader>
    <TextEditor class="mb-8" v-model="ticket.description" />
    <button class="btn-delete ml-auto" @click="deleteTicket">Delete Ticket</button>
  </div>
</template>

<script setup>
import {DateTime} from "luxon";

const { fetchTicket, updateTicketStatus, deleteTicket } = useTicket();
const ticket = ref(null);

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});


onMounted(() => {
  fetchTicket(ticket);
});

</script>
