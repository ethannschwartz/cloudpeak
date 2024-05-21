<template>
  <section class="w-full mt-36 flex items-center justify-center">
    <div class="relative p-6 w-full max-w-md min-h-[500px] rounded-2xl overflow-hidden">
      <div v-if="!isComplete" class="flex flex-col gap-8">
        <CompanyLogo />
        <h1 class="font-bold text-3xl">Register your company</h1>
        <form @submit.prevent="submit" class="flex flex-col gap-4">
          <transition :name="animation" mode="out-in">
            <div v-if="step === 0" :key="0" class="flex flex-col gap-4">
              <div class="flex flex-col sm:flex-row items-center gap-4">
                <input type="text" v-model="form.firstName" placeholder="First Name" class="input-primary w-full">
                <input type="text" v-model="form.lastName" placeholder="Last Name" class="input-primary w-full">
              </div>
              <input type="email" v-model="form.email" placeholder="Email" class="input-primary w-full">
            </div>
            <div v-else-if="step === 1" :key="1" class="flex flex-col gap-4">
              <input type="text" v-model="form.companyName" placeholder="Company Name" class="input-primary w-full">
              <input type="number" v-model="form.companySize" placeholder="How many people work at your company" class="input-primary w-full">
            </div>
            <div v-else-if="step === 2" :key="2" class="flex flex-col gap-4">
              <input type="text" v-model="form.expenses" placeholder="How much are your current cloud expenses?" class="input-primary w-full">
              <div class="custom-select">
                <select v-model="form.cloudServices" class="input-primary w-full !pr-4">
                <option value="">Which Cloud provider does your company use?</option>
                <option v-for="provider in cloudProviders" :value="provider.value">{{ provider.text }}</option>
              </select>
              </div>
            </div>
            <div v-else-if="step === 3" :key="3" class="flex flex-col gap-4">
              <input type="password" v-model="form.password" placeholder="Password" class="input-primary w-full">
              <input type="password" v-model="form.confirmPassword" placeholder="Confirm Password" required class="input-primary w-full">
            </div>
          </transition>
          <div class="flex gap-1 items-center ">
            <NuxtLink to="/login" class="link">Already have an account?</NuxtLink>
            <span class="opacity-25">•</span>
            <NuxtLink class="link" to="/about">Learn more</NuxtLink>
          </div>
          <div class="flex justify-between">
            <button v-if="step > 0" @click="backStep" type="button" class="mt-auto btn-secondary">
                <i class="fi fi-rr-arrow-left flex items-center text-sm"></i>
                Back
              </button>
            <button v-if="step <= 2" @click="nextStep" :disabled="!isSectionValid" type="button" class="ml-auto mt-auto btn-secondary">
              Next
              <i class="fi fi-rr-arrow-right flex items-center text-sm"></i>
            </button>
            <button v-else type="submit" :disabled="!isFormValid || isProcessing || errorMessage?.length" class="mt-auto btn-primary">
          <span v-if="!isProcessing" class="flex items-center gap-1">
            Submit
            <i class="fi fi-rr-paper-plane flex items-center text-sm"></i>
          </span>
          <LoadingSpinner v-else class="mx-6" />
        </button>
          </div>
          <div v-if="errorMessage" class="text-red-600">{{ errorMessage }}</div>
        </form>
      </div>
      <div v-else>
        <h1 class="font-bold text-3xl mb-8">Congrats! You're account is officially set up.</h1>
        <NuxtLink to="/dashboard" class="btn-primary absolute bottom-4 right-4">
          Go to my dashboard
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<script setup>
definePageMeta({
  layout: '',
});

useSeoMeta({
  title: 'Register',
  description: `Register for ${useState('companyName').value} to access cutting-edge DevOps solutions, enhance your cloud systems, and ensure optimal performance and security for your business.`,
  keywords: `${useState('companyName').value}, DevOps, cloud solutions, WS systems, cloud infrastructure, DevOps services, business cloud solutions, register ${useState('companyName').value}`
});


const step = ref(0);
const animation = ref('slide-left');
const isProcessing = ref(false);
const errorMessage = ref('');
const isComplete = ref(false);

const form = ref({
  firstName: 'Ethan',
  lastName: 'Schwartz',
  email: 'e.schwartz@me.com',
  companyName: 'SECLOCK',
  companySize: 240,
  expenses: '10400',
  cloudServices: 'aws',
  password: 'password',
  confirmPassword: 'password'
});

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isNameValid = (name) => /^[A-Za-z]+$/.test(name);
const isPasswordValid = (password, confirmPassword) => password === confirmPassword;

const isSectionValid = computed(() => {
  errorMessage.value = '';
  switch (step.value) {
    case 0:
      return isNameValid(form.value.firstName) &&
          isNameValid(form.value.lastName) &&
          isEmailValid(form.value.email);
    case 1:
      return form.value.companyName.length >= 1 && form.value.companySize &&
          form.value.companyName.length <= 36 && form.value.companySize > 0;
    case 2:
      return form.value.expenses !== '' &&
          form.value.cloudServices !== '';
    case 3:
      return form.value.password !== '' &&
          form.value.confirmPassword !== '' &&
          isPasswordValid(form.value.password, form.value.confirmPassword);
    default:
      return false;
  }
});

const isFormValid = computed(() => {
  return isNameValid(form.value.firstName) &&
      isNameValid(form.value.lastName) &&
      isEmailValid(form.value.email) &&
      form.value.companyName.length >= 1 &&
      form.value.companyName.length <= 36 &&
      form.value.companySize &&
      form.value.companySize > 0 &&
      form.value.expenses !== '' &&
      form.value.cloudServices !== '' &&
      form.value.password !== '' &&
      form.value.confirmPassword !== '' &&
      isPasswordValid(form.value.password, form.value.confirmPassword);
});

const submit = async () => {
  if (isFormValid.value) {
    isProcessing.value = true;
    errorMessage.value = '';
    try {
      const {data} = await $fetch('/api/register', {
        method: 'POST',
        body: form.value,
      });
      console.log('Form submitted successfully:', data);
      isComplete.value = true;
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        companySize: null,
        expenses: '',
        cloudServices: '',
        password: '',
        confirmPassword: ''
      };
    } catch (err) {
      console.error('Unexpected error:', err);
      errorMessage.value = err.statusMessage;
    } finally {
      isProcessing.value = false;
    }
  }
};

function nextStep() {
  if(isSectionValid.value) {
    step.value++;
    animation.value = 'slide-left';
  }
}

function backStep() {
  step.value--;
  animation.value = 'slide-right';
}

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
</script>

<style scoped>
.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-select select {
  width: 100%;
  padding-right: 40px; /* Adjust as needed for padding */
  appearance: none; /* Remove default arrow */
  background: transparent;
}

.custom-select::after {
  content: '▾'; /* Unicode for downward arrow */
  position: absolute;
  right: 16px; /* Adjust as needed for positioning */
  top: 10%;
  transform: scale(150%);
  pointer-events: none;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.12s ease-out;
}

.slide-right-leave-to,
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-enter-from,
.slide-left-leave-to {
  opacity: 100%;
  transform: translateX(-100%);
}
</style>