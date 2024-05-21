<template>
  <section class="w-full mt-36 flex items-center justify-center">
    <div class="flex flex-col gap-8 relative p-6 w-full max-w-md h-96 rounded-2xl overflow-hidden">
      <CompanyLogo />
      <h1 class="font-bold text-3xl">Log in to your company account</h1>
      <form @submit.prevent="submit">
          <input type="email" v-model="form.email" placeholder="Email" class="input-primary w-full mb-4">
          <input type="password" v-model="form.password" placeholder="Password" class="input-primary w-full mb-4">
        <div class="flex gap-1 items-center ">
          <NuxtLink to="/register" class="link">Don't have an account?</NuxtLink>
          <span class="opacity-25">•</span>
          <NuxtLink class="link" to="/about">Learn more</NuxtLink>
        </div>
          <button type="submit" :disabled="!isFormValid || isProcessing || errorMessage?.length" class="absolute bottom-4 right-4 btn-primary">
            <span v-if="!isProcessing" class="flex items-center gap-1">
              Log in
            </span>
            <LoadingSpinner v-else class="mx-6" />
          </button>
          <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
        </form>
    </div>
  </section>
</template>
<script setup>
const isProcessing = ref(false);
const errorMessage = ref('');

definePageMeta({
  layout: '',
});

useSeoMeta({
  title: 'Login',
  description: `Login to ${useState('companyName').value} to manage and enhance your cloud systems with our expert DevOps solutions. Ensure optimal performance and security for your business.`,
  keywords: `${useState('companyName').value}, DevOps login, cloud solutions login, WS systems login, cloud infrastructure, DevOps services login, business cloud solutions login`
});

const form = ref({
  email: 'e.schwartz@me.com',
  password: 'password',
});

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isFormValid = computed(() => {
  return isEmailValid(form.value.email) && form.value.password !== '';
});

const submit = async () => {
  if (isFormValid.value && !errorMessage.value) {
    isProcessing.value = true;
    errorMessage.value = '';
    try {
      const data = await $fetch('/api/login', {
        method: 'POST',
        body: form.value,
      });
      console.log('Form submitted successfully:', data);
      form.value = {
        email: '',
        password: '',
      };
      // Set the user state
      useState('user', () => data?.user);
      useCookie({...data?.user});

      // Redirect to the dashboard page
      navigateTo('/dashboard');
    } catch (err) {
      console.error('Unexpected error:', err);
      errorMessage.value = err.statusMessage;
    } finally {
      isProcessing.value = false;
    }
  }
};

</script>
