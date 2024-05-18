<template>
  <div class="h-screen flex flex-col">
    <Header />
    <main class="grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>