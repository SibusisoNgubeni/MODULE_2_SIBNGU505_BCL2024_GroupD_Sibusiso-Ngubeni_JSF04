import { ref } from 'vue';
import { useAuthStore } from './LoginStore';

export function useCartStore() {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
  const authStore = useAuthStore();
  
  const addToCart = (product) => {
    if (!authStore.user.value) {
      authStore.setLoginModalVisible(true);
      return;
    }
    
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  return {
    cart,
    addToCart,
  };
}
