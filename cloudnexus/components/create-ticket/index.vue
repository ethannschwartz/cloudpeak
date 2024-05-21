<template>
  <div class="z-[100] flex items-center justify-center fixed inset-0 bg-black/10">
    <div class="z-50 p-8 bg-white rounded-2xl border border-black shadow-2xl max-w-2xl w-full h-fit">
      <h2 class="font-bold text-xl mb-4">Create a Ticket</h2>
      <form class="max-w-2xl" @submit.prevent="createTicket">
        <div class="w-full mb-4">
          <label for="title" class="font-medium">Title</label>
          <input v-model="title" id="title" class="mt-1 w-full input-primary" type="text" required />
        </div>
        <div class="w-full mb-4">
          <label for="description" class="font-medium">Description</label>
          <TextEditor v-model="description" id="description" class="mt-4 w-full h-80" />
<!--          <textarea v-model="description" rows="6" id="description" class="mt-1 w-full input-primary" required></textarea>-->
        </div>
        <div class="flex flex-row-reverse items-center gap-4">
          <button type="submit" :disabled="!title || !description || isProcessing" class="btn-primary">
            <span v-if="!isProcessing">Create</span>
            <LoadingSpinner v-else class="mx-4" />
          </button>
          <button type="button" class="btn-secondary" @click="$emit('close')">Cancel</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
const title = ref('');
const description = ref('');
const isProcessing = ref(false);

const emits= defineEmits(['created', 'close']);

const createTicket = async () => {
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
  }, 1500);
  await $fetch('/api/tickets', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      status: 'To do',
      userId: useState('user').value?.id,
      user: useState('user').value,
    }
  });
  title.value = '';
  description.value = '';
  emits('created');
  emits('close');
};

const closeDialog=()=>{
  emits('close');
}
</script>
