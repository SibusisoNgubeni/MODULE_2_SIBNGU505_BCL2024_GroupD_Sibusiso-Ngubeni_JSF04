<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['login-success', 'close']);
const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = () => {
  loading.value = true;

  // Simulate login logic (replace with actual login logic)
  setTimeout(() => {
    const isSuccess = (username.value === 'mor_2314' && password.value === '83r5^_');

    if (isSuccess) {
      emit('login-success');
    } else {
      errorMessage.value = 'Invalid username or password';
      loading.value = false;
    }
  }, 1000); // Simulating async operation
};

const closeLogin = () => {
  emit('close');
};
</script>

<template>
  <div class="login-modal">
    <div class="modal-content">
      <h2>Login</h2>
      <p v-if="errorMessage">{{ errorMessage }}</p>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit" :disabled="loading">Login</button>
        <button type="button" @click="closeLogin">Close</button>
      </form>
    </div>
  </div>
</template>





<style scoped>
.login-modal {
  margin-top: 300px ;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  height: 400px;
}

.login-form {
  background-color: #242020;
  padding: 2rem;
  border-radius: 8px;
}

.error-404 {
  margin-top: 50px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  text-align: center;
  background-color: #f9f9f9;
}

.error-404 h1 {
  font-size: 3em;
  margin: 0;
}

.error-404 p {
  font-size: 1.5em;
  color: #666;
}

body.modal-open {
  overflow: hidden;
}

body.modal-open::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
}
.success-message {
  color: rgb(108, 205, 108);
  margin-top: 1em;
}
</style>
