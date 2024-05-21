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
    <div class="grid grid-cols-3 gap-4">
      <LazyProfileBlock v-for="block in profileBlocks" :name="block.name" :value="block.value"/>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: 'authenticated',
  middleware: 'auth',
});

// Cloud providers list
const cloudProviders = ref([
  { value: 'aws', text: 'Amazon Web Services (AWS)' },
  { value: 'azure', text: 'Microsoft Azure' },
  { value: 'gcp', text: 'Google Cloud Platform (GCP)' },
  { value: 'ibm', text: 'IBM Cloud' },
  { value: 'oracle', text: 'Oracle Cloud' },
  { value: 'alibaba', text: 'Alibaba Cloud' },
  { value: 'other', text: 'Other' }
]);

const user = useState('user');

const profileBlocks = ref([
  {
    name: 'Company',
    value: user.value?.companyName ?? '—',
  },
  {
    name: 'Company Size',
    value: user.value?.companySize ?? '—',
  },
  {
    name: 'Cloud Provider',
    value: cloudProviders.value.find(provider => provider.value === user.value.cloudServices)?.text ?? '—',
  },
]);
</script>