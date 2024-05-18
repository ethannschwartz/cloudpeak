<template>
  <li class='block py-8 border-b'>
    <h1 class='font-bold text-3xl text-zinc-800'>{{ solution.title }}</h1>
    <p class='h-14 font-extralight text-lg'>{{ solution.description }}</p>
  </li>
</template>

<script setup>
defineProps(['solution']);
</script>