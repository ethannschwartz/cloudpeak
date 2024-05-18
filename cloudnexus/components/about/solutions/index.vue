<template>
  <article class='p-16 flex items-center flex-row justify-start h-auto'>
    <div class='text-left'>
      <h1 class='font-bold text-6xl text-zinc-800 mb-4'>Our Solutions</h1>
      <ul>
        <AboutSolutionsSolution v-for="solution in solutions" :solution="solution" />
      </ul>
    </div>
  </article>
</template>

<script setup>
const solutions = [
  {
    title: 'Cloud Optimization',
    icon: 'integral',
    description: 'Optimize your cloud infrastructure with our cutting-edge solutions. Reduce costs and improve efficiency with our AI-powered optimization tools.',
  },
  {
    title: 'AI Solutions',
    icon: 'ruler-combined',
    description: 'Leverage the power of artificial intelligence to transform your business operations. Our AI solutions provide actionable insights, predictive analytics, and automation to drive innovation.',
  },
  {
    title: 'Cloud Performance Enhancement',
    icon: 'shield-check',
    description: 'Boost your cloud performance with our advanced performance enhancement tools. Our solutions ensure that your cloud infrastructure operates at peak efficiency, delivering superior results.',
  },
];
</script>