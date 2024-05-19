<template>
  <span class="z-[100] shadow-md text-left block absolute top-full right-0 mt-1 w-56 bg-white rounded-xl border border-black overflow-hidden p-2">
    <span v-for="link in links" class="block w-full">
      <NuxtLink
          v-if="typeof link.path === 'string'"
          :to="link.path"
          class="block duration-150 py-1 px-2 rounded-md hover:bg-zinc-100 active:bg-zinc-200 opacity-50 hover:opacity-100"
      >
        {{ link.name }}
      </NuxtLink>
      <button
          v-if="typeof link.path === 'function'"
          class="w-full text-left block duration-150 py-1 px-2 rounded-md hover:bg-zinc-100 active:bg-zinc-200 opacity-50 hover:opacity-100"
          @click="link.path"
      >
        {{ link.name }}
      </button>
    </span>
  </span>
</template>

<script setup>
defineProps(['links']);
</script>