<template>
  <section class='p-8 flex flex-col justify-center items-center w-full h-[95vh] bg-gradient-to-b from-white to-emerald-200'>
  <h1 class='text-8xl text-zinc-800 font-extrabold text-center mx-auto mb-12'>Elevate Your Business with Next-Generation Cloud Solutions.</h1>
  <div class='flex items-center gap-3'>
  <NuxtLink to='/about' class='btn-secondary'>
    <span>Learn more</span>
    <i class='fi fi-rr-arrow-right text-sm flex items-center'></i>
  </NuxtLink>
  <NuxtLink to="/login" class='btn-primary'>Get Started</NuxtLink>
  </div>
  </section>
</template>

<script setup>
const companyName = useState('companyName').value;

useSeoMeta({
  title: `${companyName} | Leading DevOps Solutions`,
  description: `${companyName} offers cutting-edge DevOps solutions to rebuild, enhance, and maintain your cloud systems. Discover how we can ensure optimal performance and security for your business.`,
  keywords: `${companyName}, DevOps solutions, cloud systems, WS systems, cloud infrastructure, DevOps services, business cloud solutions`
});

</script>