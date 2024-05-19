<template>
  <div class="h-full">
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
        <LazySearchInput v-model="searchInput" placeholder="Search tickets" />
      </div>
    </div>

    <div v-if="showCreateTicket">
      <LazyCreateTicket @created="fetchTickets" @close="showCreateTicket = false" />
    </div>

    <LazyGridView
        v-if="isGridView"
        :filtered-tickets="filteredTickets"
        :status-options="statusOptions"
    />

    <LazyListView v-else :filtered-tickets="filteredTickets" />

  </div>
</template>

<script setup>
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
</script>
