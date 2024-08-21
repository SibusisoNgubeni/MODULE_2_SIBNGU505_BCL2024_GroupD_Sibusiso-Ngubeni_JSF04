<!-- src/components/LoginModal.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../lib/LoginStore';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const username = ref('');
const password = ref('');
const passwordVisible = ref(false);
const isLoading = ref(false);
let redirectRoute = null;

onMounted(() => {
  redirectRoute = route.fullPath; 
});

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const login = async () => {
  if (!username.value || !password.value) {
    authStore.errorMessage = 'Username and password cannot be empty';
    return;
  }
  isLoading.value = true;
  try {
    await authStore.login(username.value, password.value);
    isLoading.value = false;
    username.value = '';
    password.value = '';
    if (authStore.user) {
      router.push(redirectRoute || '/');
    }
  } catch (error) {
    console.error('Login error:', error);
    isLoading.value = false;
  }
};

const handleLoginModalClose = () => {
  authStore.setLoginModalVisible(false);
};
</script>

<template>
  <div v-if="authStore.showLoginModal" class="login-modal">
    <div v-if="authStore.errorMessage" class="error-message">
      {{ authStore.errorMessage }}
    </div>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input
            :type="passwordVisible ? 'text' : 'password'"
            v-model="password"
            id="password"
            required
          />
          <label>
            <input type="checkbox" @click="togglePasswordVisibility" />
            Show Password
          </label>
        </div>
        <button type="submit" :disabled="isLoading">Login</button>
        <p v-if="isLoading">Authenticating...</p>
      </form>
      <button @click="handleLoginModalClose">Close</button>
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
