<template>
  <section class='flex flex-col justify-center items-center w-full'>
    <AboutHero />
    <AboutBenefits />
    <AboutSolutions />
    <AboutTestimonials />
  </section>
</template>

<script setup>
const companyName = useState('companyName').value;

useSeoMeta({
  title: `Learn More`,
  description: `Learn about ${companyName}, a leading provider of cutting-edge DevOps solutions. Discover our mission, vision, and the team dedicated to enhancing and maintaining your cloud systems.`,
  keywords: `${companyName}, about ${companyName}, DevOps solutions, cloud systems, WS systems, cloud infrastructure, DevOps services, about us`
});
</script>