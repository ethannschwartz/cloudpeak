<template>
  <section class="flex flex-col gap-4">
    <div>
      <span class="flex items-center justify-center text-5xl w-24 h-24 rounded-full bg-blue-500 text-white">
        {{ user?.firstName[0] }}
      </span>
    </div>
    <div>
      <div class="text-xl font-bold">{{ user.firstName }} {{ user.lastName }}</div>
      <div class="text-sm opacity-50">{{ user.email }}</div>
    </div>
    <div>
      <div class="text-sm">{{ user.companyName }}</div>
      <div class="text-sm">{{ user.companySize }} employees</div>
      <div class="text-sm uppercase">{{ user.cloudServices }}</div>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

const user = useState('user');
</script>