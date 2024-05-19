<template>
  <div
      @click="disabled ? null : searchInput.focus()"
      class="flex items-center gap-1 input-primary"
      :class="{
        'opacity-50 pointer-events-none': disabled,
        'cursor-text': !disabled
      }"
  >
    <i class="opacity-50 fi fi-rr-search flex items-center"></i>
    <input
        ref="searchInput"
        type="text"
        class="grow h-full focus-within:outline-none"
        :placeholder="placeholder"
        v-model="computedValue"
        :disabled="disabled"
    >
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const searchInput = ref(null);

const emits = defineEmits(['update:modelValue']);

const computedValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});
</script>