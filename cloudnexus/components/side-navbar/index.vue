<template>
  <aside class="sticky h-fit top-0 shrink-0 py-8 pl-8 w-64">
    <ul>
      <li v-for="link in authenticatedRoutes">
        <NuxtLink
            class="text-sm duration-150 block opacity-50 hover:opacity-100 p-2 hover:bg-zinc-100 w-full rounded-lg"
            active-class="bg-zinc-200 !opacity-100 pointer-events-none font-medium"
            :to="link?.path"
            :class="{
                  'bg-zinc-200 !opacity-100 pointer-events-none font-medium':route.path.includes(link.path+'/')
                }"
        >
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const route = useRoute();

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
    path: '/support',
  },
  {
    name: 'Tickets',
    path: '/tickets',
  },
];

</script>