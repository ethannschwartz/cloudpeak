<template>
  <div class="mb-8">
    <div class="w-full flex items-center justify-center">
      <h1 class="grow font-bold text-3xl" v-html="text"></h1>
      <div>
        <slot name="options" />
      </div>
    </div>
    <slot name="subtitle" />
  </div>
</template>

<script setup>
defineProps(['text']);
</script>