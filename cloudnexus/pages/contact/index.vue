<template>
  <div class="h-full flex items-center max-w-xl m-auto">
    <div class="w-full">
      <h1 class="text-5xl font-bold mb-1">Contact Us</h1>
      <p class="text-sm text-zinc-500 mb-4">
        Reach out to learn more about our pricing options and discover how we can benefit your business.
      </p>
      <form class="w-full">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 mb-1">Name</label>
          <input v-model="contactForm.name" type="text" id="name" class="w-full input-primary">
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-1">Email</label>
          <input v-model="contactForm.email" type="email" id="email" class="w-full input-primary">
        </div>
        <div class="mb-4">
          <label for="message" class="block text-gray-700 mb-1">Message</label>
          <textarea v-model="contactForm.message" id="message" rows="6" class="w-full input-primary"></textarea>
        </div>
        <button :disabled="!isFormValid" type="submit" class="btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const contactForm = reactive({
  name: '',
  email: '',
  message: '',
});

const isFormValid = computed(() => {
  return !!(contactForm.name && contactForm.email && contactForm.message && contactForm.message);
});
</script>