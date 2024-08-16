<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const login = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Store user data and token
    localStorage.setItem('user', JSON.stringify(data));
    // Redirect to home or another page
    router.push('/');
  } catch (err) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit" :disabled="loading">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>