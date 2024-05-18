<template>
  <div class="py-4 px-8 flex items-center justify-between">
    <h5 class="flex items-center font-bold text-xl gap-1">
      <span class="text-white p-1.5 rounded-full bg-black">
        <i class="fi fi-rr-cloud-showers flex items-center text-sm"></i>
      </span>
      {{ useState('companyName').value }}
    </h5>
    <ul class="hidden md:flex items-center gap-4">
      <li v-for="link in links">
        <Navlink :name="link.name" :route="link.route" />
      </li>
    </ul>
    <button class="flex md:hidden opacity-75 hover:opacity-100">
      <i class="fi fi-rr-menu-burger flex items-center text-xl"></i>
    </button>
  </div>
</template>
<script setup lang="ts">

const links = [
  {
    name: 'Home',
    route: '/',
  },
  {
    name: 'About',
    route: '/about',
  },
  {
    name: 'FAQ',
    route: '/faq',
  },
  {
    name: 'Contact us',
    route: '/contact',
  },
]

</script>