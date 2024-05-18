<template>
  <span>
      <NuxtLink
          :to="route"
          active-class="!bg-black !text-white pointer-events-none"
          class="duration-150 block hover:scale-105 active:scale-110 hover:bg-zinc-100 text-black bg-transparent font-medium px-2.5 py-1 text-sm rounded-lg "
      >
        {{ name }}
      </NuxtLink>
  </span>
</template>

<script setup>
defineProps(['route', 'name']);

</script>