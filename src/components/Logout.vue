<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  localStorage.removeItem('user');
  router.push('/login'); // Redirect to login page after logout
});
</script>

<template>
    <div>
      <p>Logging out...</p>
    </div>
  </template>
  
 
  