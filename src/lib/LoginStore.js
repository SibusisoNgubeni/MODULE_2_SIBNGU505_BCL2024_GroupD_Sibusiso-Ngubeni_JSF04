import { ref } from 'vue';

export const useAuthStore = () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const showLoginModal = ref(false);
  const errorMessage = ref('');

  const login = async (username, password) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.token) {
        user.value = { username, token: data.token };
        localStorage.setItem('user', JSON.stringify(user.value));
        showLoginModal.value = false;
        errorMessage.value = '';
        console.log('Login successful:', data);
      } else {
        errorMessage.value = 'Invalid username or password';
        console.log('Login failed: Invalid credentials');
      }
    } catch (error) {
      errorMessage.value = 'An error occurred during login';
      console.log('Login error:', error);
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  const setLoginModalVisible = (isVisible) => {
    showLoginModal.value = isVisible;
  };

  return {
    user,
    login,
    logout,
    showLoginModal,
    setLoginModalVisible,
    errorMessage,
  };
};

