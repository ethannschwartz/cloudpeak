<template>
  <div class="flex flex-col h-full">
    <PageHeader text="Customer Support Chat" />
    <div class="grow">
      <ul>
        <li v-for="response in conversationHistory">
          <div class="w-fit max-w-lg p-4 rounded-2xl" :class="response.sender === 'system' ? 'bg-black text-white' : 'bg-zinc-100 text-black ml-auto'" >{{ response.message }}</div>
        </li>
      </ul>
    </div>
    <div class="p-4 rounded-xl bg-zinc-100 flex items-center w-full">
      <textarea v-model="message" class="focus-within:outline-none bg-transparent resize-none grow" placeholder="Type your message here"></textarea>
      <button class="btn-primary" :disabled="isLoading || !message" @click="sendMessage">
        <LoadingSpinner v-if="isLoading" />
        <span v-else>Send</span>
      </button>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: "authenticated",
});

const message = ref('');
const response = ref(null);
const isLoading = ref(false);

const conversationHistory = ref([]);

const sendMessage = async () => {
  isLoading.value = true;
  try {
    conversationHistory.value.push({
      sender: 'user',
      message: message.value,
    })
    message.value = '';
    response.value = await useChatSupport(message.value);
    conversationHistory.value.push({
      sender: 'system',
      message: response.value,
    })
  } catch (error) {
    alert('Error sending message. Please try again.');
  }
  isLoading.value = false;

};
</script>

<style>
/* Add your styles here */
</style>
