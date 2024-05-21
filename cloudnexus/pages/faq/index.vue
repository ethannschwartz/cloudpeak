<template>
  <section class="mt-12 max-w-3xl mx-auto">
    <h1 class="text-4xl font-bold type-primary mb-4">FAQ</h1>
    <ul>
      <li v-for="(faq, i) in pageData.faqs" class="mb-6 p-6 bg-zinc-50 rounded-2xl">
        <button @click="isOpen = isOpen === i ? null : i" class="w-full flex justify-between items-center">
          <span class="font-bold text-xl">{{ faq.question }}</span>
          <i class="fi fi-rr-angle-down flex items-center" :class="isOpen === i ? 'rotate-180' : ''"></i>
        </button>
        <p class="font-extralight mt-2" :key="i" v-show="isOpen === i" v-html="faq.answer"></p>
      </li>
    </ul>

  </section>
</template>

<script setup>
const companyName = useState('companyName').value;

useSeoMeta({
  title: `FAQ`,
  description: `Find answers to frequently asked questions about ${companyName}'s DevOps solutions and services. Get information on how we can help enhance and maintain your cloud systems.`,
  keywords: `FAQ, ${companyName}, frequently asked questions, DevOps solutions, cloud systems, WS systems, cloud infrastructure, DevOps services`
});

const isOpen = ref(0);

const pageData = {
  company: useState('companyName').value,
  faqs: [
    {
      question: `What is ${useState('companyName').value}?`,
      answer: `${useState('companyName').value} is a cutting-edge DevOps service provider that specializes in replacing traditional DevOps engineers with a team of highly skilled professionals. We offer comprehensive solutions to rebuild, enhance, and maintain your existing AWS and cloud systems, ensuring optimal performance and security.`
    },
    {
      question: `What services does ${useState('companyName').value} offer?`,
      answer: "<ol class=\"list-decimal list-inside\"><li><span class=\"font-bold\">Initial Assessment and Planning:</span><ul class=\"list-disc list-inside ml-4\"><li>Comprehensive audit of your current infrastructure.</li><li>Customized plan for enhancement or rebuilding.</li></ul></li><li><span class=\"font-bold\">Implementation:</span><ul class=\"list-disc list-inside ml-4\"><li>Rebuilding or enhancing existing AWS and cloud systems.</li><li>Ensuring seamless integration with your operations.</li></ul></li><li><span class=\"font-bold\">Continuous Maintenance:</span><ul class=\"list-disc list-inside ml-4\"><li>Ongoing monitoring, maintenance, updates, and support.</li><li>24/7 support and quick response times.</li></ul></li></ol>"
    },
    {
      question: "How does the pricing structure work?",
      answer: "We offer a transparent and flexible pricing structure, including an initial setup fee and a monthly retainer. Please reach out and we will be happy to find a solution that meets your needs!"
    },
    {
      question: `Why choose ${useState('companyName').value} over hiring in-house DevOps engineers?`,
      answer: "<ul class=\"list-disc list-inside\"><li><span class=\"font-bold\">Cost Efficiency:</span> Save on the high costs of hiring, training, and retaining in-house DevOps engineers.</li><li><span class=\"font-bold\">Expertise:</span> Gain access to a team of seasoned professionals with extensive experience in AWS and cloud systems.</li><li><span class=\"font-bold\">Scalability:</span> Easily scale your DevOps needs up or down based on your business requirements.</li><li><span class=\"font-bold\">Reliability:</span> Enjoy continuous maintenance and support, ensuring your systems are always running smoothly.</li></ul>"
    },
    {
      question: `How do I get started with ${useState('companyName').value}?`,
      answer: "Getting started is simple! Contact us through our website or email us at e.schwartz@me.com. We'll schedule an initial consultation to understand your needs and provide a customized proposal tailored to your business."
    },
    {
      question: `What industries does ${useState('companyName').value} serve?`,
      answer: "We serve a wide range of industries, including but not limited to:<br><ul class=\"list-disc list-inside ml-4\"><li>Technology</li><li>Finance</li><li>Healthcare</li><li>E-commerce</li><li>Education</li><li>Manufacturing</li></ul>"
    },
    {
      question: `What makes ${useState('companyName').value} different from other DevOps service providers?`,
      answer: "<ul class=\"list-disc list-inside\"><li><span class=\"font-bold\">Personalized Service:</span> We tailor our solutions to meet the unique needs of each client.</li><li><span class=\"font-bold\">Proven Track Record:</span> Our team has a history of successful projects and satisfied clients.</li><li><span class=\"font-bold\">Innovative Solutions:</span> We leverage the latest technologies and best practices to deliver exceptional results.</li></ul>"
    },
    {
      question: `How can I contact ${useState('companyName').value} for media inquiries?`,
      answer: "For media inquiries, please contact our PR team at e.schwartz@me.com. We'll be happy to provide more information and arrange interviews or feature articles."
    },
    {
      question: `What are the next steps after contacting ${useState('companyName').value}?`,
      answer: "Once you reach out, our team will:<br><ol class=\"list-decimal list-inside ml-4\"><li>Schedule an initial consultation to discuss your needs.</li><li>Perform a comprehensive assessment of your current infrastructure.</li><li>Provide a detailed proposal and timeline for implementation.</li><li>Begin the enhancement or rebuilding process.</li><li>Provide continuous maintenance and support to ensure long-term success.</li></ol>"
    }
  ]
}

</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transform-origin: top;
  transition: transform 0.3s ease-in-out;
}

.scale-enter-to,
.scale-leave-from {
  transform: scaleY(1);
}

.scale-enter-from,
.scale-leave-to {
  transform: scaleY(0);
}
</style>