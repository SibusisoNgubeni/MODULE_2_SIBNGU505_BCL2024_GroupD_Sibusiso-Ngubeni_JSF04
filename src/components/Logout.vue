<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  localStorage.removeItem('user');
  router.push('/login'); 
});
</script>
 
<template>
    <div>
      <p>Logging out...</p>
    </div>
  </template>
  
 
  