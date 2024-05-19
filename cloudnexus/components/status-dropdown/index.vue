<template>
  <div class="relative">
    <button
        v-click-outside="closeDropdown"
        @click.stop.prevent="toggleDropdown"
        :class="{
          'bg-zinc-600/10 text-zinc-600 hover:bg-zinc-600/20': ticket.status.toLowerCase() === 'to do',
          'bg-blue-600/10 text-blue-600 hover:bg-blue-600/20': ticket.status.toLowerCase() === 'in progress',
          'bg-amber-600/10 text-amber-600 hover:bg-amber-600/20': ticket.status.toLowerCase() === 'in review',
          'bg-green-600/10 text-green-600 hover:bg-green-600/20': ticket.status.toLowerCase() === 'done',
        }"
        class="whitespace-nowrap duration-150 font-medium tracking-wide text-sm rounded-lg px-3 py-1"
    >
      {{ ticket.status }}
    </button>
    <Transition :name="isDropdownOpen ? 'fade-up' : 'fade-down'">
      <span v-if="isDropdownOpen" class="z-20 shadow-md text-left block absolute top-full right-0 mt-1 w-56 bg-white rounded-xl border border-black overflow-hidden p-2">
    <span v-for="status in statuses" class="block w-full">
      <button
          :class="`w-full text-left block duration-150 py-1 px-2 rounded-md hover:text-${status.color}-600 hover:bg-${status.color}-600/10 active:bg-${status.color}-600/10 active:scale-95`"
          @click.prevent="$emit('select', status.name)"
      >
        {{ status.name }}
      </button>
    </span>


    <!--    not supposed to be visible-->
    <span hidden>
      <span class="text-amber-600 bg-amber-600/10 hover:text-amber-600 hover:bg-amber-600/10 hover:bg-amber-100 active:bg-amber-600/20"></span>
      <span class="text-blue-600 bg-blue-600/10 hover:text-blue-600 hover:bg-blue-600/10 hover:bg-blue-100 active:bg-blue-600/20"></span>
      <span class="text-green-600 bg-green-600/10 hover:text-green-600 hover:bg-green-600/10 hover:bg-green-100 active:bg-green-600/20"></span>
      <span class="text-zinc-600 bg-zinc-600/10 hover:text-zinc-600 hover:bg-zinc-600/10 hover:bg-zinc-100 active:bg-zinc-600/20"></span>
    </span>
  </span>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps(['ticket']);
defineEmits(['select']);

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};
const statuses = [
  {
    name: 'To Do',
    color: 'zinc',
  },
  {
    name: 'In Progress',
    color: 'blue',
  },
  {
    name: 'In Review',
    color: 'amber',
  },
  {
    name: 'Done',
    color: 'green',
  },
]
</script>