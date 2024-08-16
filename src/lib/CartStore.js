
import { ref } from 'vue';

export const useCartStore = () => {
  const cart = ref([]);

  const addToCart = (product) => {
    const item = cart.value.find(item => item.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
  };

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter(item => item.id !== productId);
  };

  const clearCart = () => {
    cart.value = [];
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};
