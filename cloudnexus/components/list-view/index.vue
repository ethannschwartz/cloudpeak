<template>
  <div>
    <ul>
      <li class="sticky top-0 bg-white z-50 flex w-full items-center justify-between border-b pt-4 pb-2">
        <span class="max-w-xs w-full shrink-1 font-bold text-xs opacity-75">Ticket</span>
        <span class="w-36 font-bold text-xs opacity-75">Updated At</span>
        <span class="w-36 font-bold text-xs opacity-75">Created At</span>
        <span class="w-32 font-bold text-xs opacity-75 text-right">Status</span>
      </li>
      <li v-for="ticket in filteredTickets">
        <LazyTicketItem :ticket="ticket" />
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps(['filteredTickets']);
</script>