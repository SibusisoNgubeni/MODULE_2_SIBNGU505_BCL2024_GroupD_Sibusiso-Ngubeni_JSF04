import { ref } from 'vue';

export const useAuthStore = () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const error = ref(null);

  const login = (userData) => {
    if (userData.username === 'correctUsername' && userData.password === 'correctPassword') {
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      error.value = null;
      return { success: true, message: 'Login successful!' };
    } else {
      error.value = 'Invalid username or password';
      return { success: false, message: error.value };
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
    error,
  };
};
