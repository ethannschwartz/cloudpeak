<template>
  <article>
    <div class='p-16 h-auto'>
      <div class='mb-8'>
        <h1 class='font-bold text-4xl text-zinc-800 mb-4'>Why Choose {{ useState('companyName').value }}?</h1>
        <p class='text-left text-2xl font-extralight'>
          Experience unprecedented efficiency with our AI-driven cloud solutions. Our advanced
          algorithms continuously analyze and optimize your cloud infrastructure, ensuring maximum
          performance at all times.
        </p>
      </div>
      <ul class='flex items-center gap-8'>
        <AboutBenefitsBenefit v-for="benefit in benefits" :benefit="benefit" />
      </ul>
    </div>
  </article>
</template>

<script setup>
const benefits = [
  {
    title: 'Seamless Integration',
    icon: 'integral',
    description: 'Integrate effortlessly with your existing systems. '+ useState('companyName').value + ' provides robust APIs and tools that make the transition to our platform smooth and hassle-free.',
  },
  {
    title: 'Scalable Solutions',
    icon: 'ruler-combined',
    description: 'Grow your business without limits. Our scalable cloud solutions are designed to adapt to your evolving needs, providing you with the flexibility to expand as your business grows.',
  },
  {
    title: 'Security You Can Trust',
    icon: 'shield-check',
    description: `Rest easy knowing your data is secure. ${useState('companyName').value} employs top-tier security measures, including encryption, multi-factor authentication, and continuous monitoring to protect your critical information.`,
  },
];
</script>