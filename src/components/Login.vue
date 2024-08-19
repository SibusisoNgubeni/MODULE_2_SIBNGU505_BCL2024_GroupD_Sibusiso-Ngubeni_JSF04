<script setup>
import { ref } from 'vue';

const showLoginForm = ref(false);
const show404 = ref(false);
const isLoggedIn = ref(false);
const successMessage = ref('');

const toggleLoginForm = () => {
  if (isLoggedIn.value) {
    logout();
  } else {
    showLoginForm.value = !showLoginForm.value;
  }
};

const username = ref('');
const password = ref('');
const loading = ref(false);

const login = () => {
  loading.value = true;

  setTimeout(() => {
    if (username.value === 'mor_2314' && password.value === '83r5^_') {
      loading.value = false;
      isLoggedIn.value = true;
      show404.value = false;
      successMessage.value = 'Logged in successfully!';
      
      setTimeout(() => {
        showLoginForm.value = false;
        successMessage.value = '';
      }, 3000);

      username.value = '';
      password.value = '';
    } else {
      loading.value = false;
      show404.value = true;
      isLoggedIn.value = false;
    }
  }, 1000);
};

const logout = () => {
  isLoggedIn.value = false;
  successMessage.value = 'Logged out successfully!';

  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};
</script>

<template>
  <div>
    <header v-if="!show404">
      <nav>
        <ul class="nav-menu">
          <li>
            <button @click="toggleLoginForm">
              {{ isLoggedIn ? 'Logout' : 'Login' }}
            </button>
          </li>
        </ul>
      </nav>
    </header>

    
    <div v-if="showLoginForm" class="login-modal">
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

     
      <div v-if="!isLoggedIn && !successMessage">
        <div class="login-form">
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
        </div>
        <div v-if="show404" class="error-404">
          <p>The page you're looking for does not exist.</p>
        </div>
      </div>
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
