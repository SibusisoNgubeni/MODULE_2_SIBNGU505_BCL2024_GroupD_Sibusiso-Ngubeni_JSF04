<script setup>
import { ref, defineEmits } from 'vue';
import { useAuthStore } from '../lib/LoginStore';

const emit = defineEmits(['login-success', 'close']);
const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    await authStore.login(username.value, password.value);
    emit('login-success');
  } catch (error) {
    errorMessage.value = error.message || 'Invalid username or password';
    loading.value = false;
  }
};

const closeLogin = () => {
  emit('close');
};
</script>

<template>
  <div class="login-modal">
    <div class="modal-content">
      <h2></h2>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <div class="form-buttons">
          <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
          <button type="button" @click="closeLogin">Close</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-modal {
  margin-top: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(15px);
  z-index: 1000;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%; 
  height: 100vh;
}

.modal-content {
  margin-top: 300px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  height: 200px;
  width:  400px;
  background-color: #7c7c7c;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #868889;
  color: #fff;
}

button[type="button"] {
  background-color: #8a8888;
  color: #fff;
}

button:disabled {
  background-color: #ccc;
}

.error-message {
  color: #dc3545;
  margin-bottom: 1rem;
}
</style>
