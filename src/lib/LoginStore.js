import { ref } from 'vue';

export const useAuthStore = () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const showLoginModal = ref(false);

  const login = (userData) => {
    if (userData.username === 'mor_2314' && userData.password === '83r5^_') {
      user.value = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      showLoginModal.value = false;
    } else {
      showLoginModal.value = true;
    }
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
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
  };
};
