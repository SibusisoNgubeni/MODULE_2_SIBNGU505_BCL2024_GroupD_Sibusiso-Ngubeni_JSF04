import { ref, watch } from 'vue';

export function useCartStore() {
  const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

  const addToCart = (product) => {
    const existingItem = cart.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    updateLocalStorage();
  };

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
    updateLocalStorage();
  };

  const clearCart = () => {
    cart.value = [];
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value));
  };

  watch(cart, () => {
    updateLocalStorage();
  }, { deep: true });

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
