<template>
  <section>
    <PageHeader :text="`Welcome to your ${useState('companyName').value} dashboard`" />
    {{ user }}
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
import {useAuth0} from "@auth0/auth0-vue";

definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

const { user } = useAuth0();
onMounted(() => {
  console.log('user', user.value)
;})
</script>