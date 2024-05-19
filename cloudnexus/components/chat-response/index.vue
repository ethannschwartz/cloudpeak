<template>
  <div
      class="w-fit max-w-lg p-4 rounded-2xl"
      :class="response.sender === 'system' ? 'bg-black text-white' : 'bg-zinc-100 text-black ml-auto'"
  >
    <div v-html="response.message"></div>
  </div>
</template>

<script setup>
defineProps(['response']);
</script>