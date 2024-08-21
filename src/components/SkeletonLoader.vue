
<template>
    <div class="skeleton-overlay" v-if="show">
      <div class="skeleton-content"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  
  const props = defineProps({
    show: Boolean
  });
  </script>
  
  <style scoped>
  .skeleton-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .skeleton-content {
    width: 60%;
    height: 60%;
    background: #f0f0f0;
    border-radius: 4px;
  }
  </style>
  