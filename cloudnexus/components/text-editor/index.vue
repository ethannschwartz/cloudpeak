<template>
  <div class="relative py-2 rounded-2xl duration-150 group">
    <div ref="quillEditor" class="z-10"></div>
    <div class="duration-150 scale-[1.02] rounded-xl z-0 absolute inset-0 group-hover:bg-zinc-100 group-focus-within:bg-zinc-100"></div>
  </div>
</template>

<script setup>
import Quill from 'quill';
import 'quill/dist/quill.bubble.css'; // You can use other themes like 'bubble.css'

const quillEditor = ref(null);
const quillInstance = ref(null);

const props = defineProps({
  modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

onMounted(() => {
  quillInstance.value = new Quill(quillEditor.value, {
    theme: 'bubble',
    placeholder: 'Enter some text',
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block'],
      ],
    },
  });

  // Set initial content
  if (props.modelValue) {
    quillInstance.value.root.innerHTML = props.modelValue;
  }

  // Emit content on change
  quillInstance.value.on('text-change', () => {
    emit('update:modelValue', quillInstance.value.root.innerHTML);
  });
});

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== quillInstance.value.root.innerHTML) {
    quillInstance.value.root.innerHTML = newValue;
  }
});
</script>

<style>
/* You can add custom styles for your editor here */
.ql-editor {
  padding: 0 !important;
}

.ql-container {
  font-size: 16px !important;
}

.ql-editor.ql-blank::before {
  position: absolute !important;
  left: 0 !important;
}
</style>
