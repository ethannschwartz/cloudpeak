<template>
  <div class="relative h-screen flex flex-col">
    <header class="border-b flex items-center justify-between gap-4 py-4 px-8">
      <CompanyLogo />
      <ProfileButton />
    </header>
    <div class="flex grow">
      <SideNavbar />
      <main class="border-red-500 grow p-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>

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