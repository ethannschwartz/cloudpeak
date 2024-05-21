<template>
  <span
      :class="{
        'chat-loader': chat,
        'loader': !chat,
      }"
  ></span>
</template>

<script setup>
defineProps(['chat']);
</script>

<style scoped>
.loader {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite
}
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  inset: 0px;
  border-radius: 50%;
  border: 1px solid #FFF;
  animation: prixClipFix 2s linear infinite ;
}

@keyframes rotate {
  100%   {transform: rotate(360deg)}
}

@keyframes prixClipFix {
  0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
}

.chat-loader {
  width: 24px;
  height: 24px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>