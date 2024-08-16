import { ref } from 'vue';

export const useAuthStore = () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));

  const login = (userData) => {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  return {
    user,
    login,
    logout,
  };
};
