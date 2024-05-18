<template>
  <section>
    <PageHeader :text="`Welcome to your ${useState('companyName').value} dashboard`" />
    <article class="gap-8 grid grid-cols-2 h-64">
      <div class="flex items-center justify-center p-8 h-full w-full rounded-2xl border border-black">
        Chart data currently unavailable
      </div>
      <div class="flex items-center justify-center p-8 h-full w-full rounded-2xl border border-black">
        Chart data currently unavailable
      </div>
    </article>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});
</script>