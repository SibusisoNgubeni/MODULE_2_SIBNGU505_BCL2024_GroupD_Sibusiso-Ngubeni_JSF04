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
    console.log('Added to cart:', product);
    console.log('Current cart:', cart.value);
  };

  const removeFromCart = (productId) => {
    cart.value = cart.value.filter((item) => item.id !== productId);
    updateLocalStorage();
    console.log('Removed from cart, ID:', productId);
    console.log('Current cart:', cart.value);
  };

  const clearCart = () => {
    cart.value = [];
    updateLocalStorage();
    console.log('Cart cleared');
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

