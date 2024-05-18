<template>
  <article
      class='bg-black text-white p-16 flex items-center flex-row justify-start h-auto'>
  <div class='text-çenter'>
    <h1 class='text-center font-bold text-6xl text-white mb-4'>Testimonials</h1>
    <ul class='flex items-center gap-8'>
      <li v-for="testimonial in testimonials" class='block p-8'>
        <h1 class='text-center font-bold text-3xl text-white mb-2'>{{ testimonial.description }}</h1>
        <p class='text-center h-14 font-extralight text-lg'>— {{ testimonial.name }}</p>
      </li>
    </ul>
  </div>
  </article>
</template>

<script setup>
const testimonials = [
  {
    description: '"' + useState('companyName').value + ' has transformed our business operations. Their AI solutions have provided us with invaluable insights and improved our efficiency dramatically."',
    name: "Jane Doe, CEO of Tech Innovators",
  },
  {
    description: '"The integration process was seamless, and the performance enhancements have been remarkable. We couldn\'t be happier with '+ useState('companyName').value + '."',
    name: "John Smith, CTO of Future Enterprises",
  },
];
</script>