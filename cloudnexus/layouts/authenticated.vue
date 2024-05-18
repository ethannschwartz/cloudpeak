<template>
  <div v-if="useState('user')">
    <header class="border-b flex items-center justify-between gap-4 py-4 px-8">
      <h1 class="flex items-center gap-1.5 font-bold">
        <span class="text-white p-1.5 rounded-full bg-black">
          <i class="fi fi-rr-cloud-showers flex items-center text-sm"></i>
        </span>
        {{ useState('companyName').value }}
      </h1>
      <button
          v-click-outside="closeDropdown"
          @click="toggleDropdown"
          class="relative group flex items-center gap-1.5"
      >
        <span class="flex items-center justify-center w-5 h-5 text-white bg-blue-500 rounded-full text-xs">{{ useState('user').value?.firstName[0] }}</span>
        <span class="duration-150 opacity-50 group-hover:opacity-100 text-sm">{{ useState('user').value?.firstName }} {{ useState('user').value?.lastName }}</span>

        <Transition :name="isDropdownOpen ? 'fade-up' : 'fade-down'">
          <LazyDropdownLinks v-if="isDropdownOpen" :links="dropdownLinks" />
        </Transition>
      </button>

    </header>
    <div class="flex">
      <aside class="shrink-0 py-8 pl-8 w-64">
        <ul>
          <li v-for="link in authenticatedRoutes">
            <NuxtLink
                class="text-sm duration-150 block opacity-50 hover:opacity-100 p-2 hover:bg-zinc-100 w-full rounded-lg"
                active-class="bg-zinc-200 !opacity-100 pointer-events-none font-medium"
                :class="{
                  'bg-zinc-200 !opacity-100 pointer-events-none font-medium':$route.path.includes(link.path+'/')
                }"
                :to="link.path"
                :text="link.name"
            />
          </li>
        </ul>
      </aside>
      <main class="grow p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
const authenticatedRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
  },
  {
    name: 'Notifications',
    path: '/notifications',
  },
  {
    name: 'Company Profile',
    path: '/',
  },
  {
    name: 'Report an Issue',
    path: '/',
  },
  {
    name: 'Cloud Services',
    path: '/',
  },
  {
    name: 'Chat Support',
    path: '/',
  },
  {
    name: 'Tickets',
    path: '/tickets',
  },
];

const dropdownLinks = [
  {
    name: 'Company Profile',
    path: '/',
  },
  {
    name: 'User Settings',
    path: '/',
  },
  {
    name: 'Log out',
    path: () => {
      // Clear user state
      useState('user', () => null);

      // Clear the cookie
      const userCookie = useCookie('user');
      userCookie.value = null;

      // Navigate to login page
      navigateTo('/login');
    }
  },
]


const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
</script>

<style>
.fade-up-enter-active,
.fade-up-leave-active,
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.1s ease-in-out;
}

.fade-up-leave-to,
.fade-down-enter-from {
  opacity: 0;
  transform: translateY(10%);
}

.fade-up-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>