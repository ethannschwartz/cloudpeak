<template>
  <button
      v-click-outside="closeDropdown"
      @click="toggleDropdown"
      class="relative group flex items-center gap-1.5"
  >
    <span class="flex items-center justify-center w-5 h-5 text-white bg-blue-500 rounded-full text-xs">{{ useState('user')?.value?.firstName?.[0] }}</span>
    <span class="duration-150 opacity-50 group-hover:opacity-100 text-sm">{{ useState('user')?.value?.firstName }} {{ useState('user')?.value?.lastName }}</span>

    <Transition :name="isDropdownOpen ? 'fade-up' : 'fade-down'">
      <LazyDropdownLinks v-if="isDropdownOpen" :links="dropdownLinks" />
    </Transition>
  </button>
</template>

<script setup>
const dropdownLinks = computed(() => [
  {
    name: 'Company Profile',
    path: '/profile',
  },
  {
    name: 'User Settings',
    path: '/',
  },
  {
    name: 'Log out',
    path: () => {
      useState('user', () => null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigateTo('/login');
    }
  },
]);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>