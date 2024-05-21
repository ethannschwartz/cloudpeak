<template>
  <div class="p-6 rounded-2xl bg-zinc-100">
    <p class="text-sm font-extralight">{{ name }}</p>
    <div class="font-bold text-2xl">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps(['name', 'value']);
</script>