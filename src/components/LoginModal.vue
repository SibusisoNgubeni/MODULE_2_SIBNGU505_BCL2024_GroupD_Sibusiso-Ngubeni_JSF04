<template>
    <div v-if="showModal" class="login-modal">
      <div class="modal-content">
        <LoginForm />
        <!-- Dont forget to make log in form-->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../lib/LoginStore';
  import LoginForm from './LoginForm.vue';
  
  const authStore = useAuthStore();
  const showModal = ref(authStore.loginModalVisible);
  
  authStore.$subscribe((mutation, state) => {
    showModal.value = state.loginModalVisible;
  });
  </script>
  