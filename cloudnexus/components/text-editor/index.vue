<template>
  <div class="relative py-2 rounded-2xl duration-150 group">
    <div ref="quillEditor" class="z-10"></div>
    <div class="duration-150 scale-[1.02] rounded-xl z-0 absolute inset-0 group-hover:bg-zinc-100 group-focus-within:bg-zinc-100"></div>
    <div v-if="showSaveButton" class="flex items-center gap-1 absolute top-full -left-2 mt-1 p-1 rounded-xl">
      <button @click="save"  class="hover:scale-105 active:scale-95 duration-150 p-2 rounded-md bg-zinc-100 shadow-md border border-zinc-200">
        <i class="fi fi-rr-check flex items-center"></i>
      </button>
      <button
          @click="ticket.description = initialDescription; showSaveButton = false"
          class="hover:scale-105 active:scale-95 duration-150 p-2 rounded-md bg-zinc-100 shadow-md border border-zinc-200"
      >
        <i class="fi fi-rr-cross flex items-center"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';

const { updateTicketDescription } = useTicket();

const quillEditor = ref(null);
const quillInstance = ref(null);

const props = defineProps(['modelValue', 'ticket', 'canUpdate']);

const emit = defineEmits(['update:modelValue']);

let initialDescription = ref(props.ticket.description);

const showSaveButton = computed(() => props.ticket.description !== initialDescription.value);

function save() {
  updateTicketDescription(props.ticket, props.ticket.description);
  initialDescription.value = props.ticket.description;
}

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
