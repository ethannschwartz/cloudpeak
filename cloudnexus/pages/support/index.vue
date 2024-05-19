<template>
  <div class="h-full flex flex-col">
    <PageHeader text="Customer Support Chat" />
    <div ref="chatContainer" class="grow overflow-auto">
      <ul>
        <li v-for="response in conversationHistory" class="mb-4" :key="response.message">
          <LazyChatResponse :response="response" />
        </li>
        <li v-if="isLoading" class="pb-64">
          <span class="chat-loader"></span>
        </li>
      </ul>
    </div>
    <div class="sticky pb-8 bg-white bottom-0 left-0 right-0 flex items-center w-full gap-4">
      <textarea
          v-model="message"
          class="px-4 py-2 rounded-xl bg-zinc-100 focus-within:outline-none bg-transparent resize-none grow"
          placeholder="Type your message here"
          rows="1"
      ></textarea>
      <button class="btn-primary" :disabled="isLoading || !message" @click="sendMessage">
        <LoadingSpinner v-if="isLoading" />
        <span v-else>
          <i class="fi fi-rr-paper-plane flex items-center text-xl"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

definePageMeta({
  layout: "authenticated",
});

const message = ref('');
const response = ref(null);
const isLoading = ref(false);
const conversationHistory = ref([]);
const chatContainer = ref(null);

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  });
};

const sendMessage = async () => {
  if (!message.value.trim()) return;

  let messageToSend = message.value;
  message.value = '';

  isLoading.value = true;
  try {
    conversationHistory.value.push({
      sender: 'user',
      message: messageToSend,
    });
    await nextTick();
    scrollToBottom();

    response.value = await useChatSupport(messageToSend);
    conversationHistory.value.push({
      sender: 'system',
      message: response.value,
    });
    await nextTick();
    scrollToBottom();
  } catch (error) {
    alert('Error sending message. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
.chat-loader {
  width: 24px;
  height: 24px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>