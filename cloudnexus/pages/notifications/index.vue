<template>
  <section>
    <PageHeader text="My Notifications" />
    <article>
      <div v-if="!notifications">
        You have no notifications yet.
      </div>
      <div v-else>
        <em>notifications will be displayed here...</em>
      </div>
    </article>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});
defineProps(['notifications']);
</script>