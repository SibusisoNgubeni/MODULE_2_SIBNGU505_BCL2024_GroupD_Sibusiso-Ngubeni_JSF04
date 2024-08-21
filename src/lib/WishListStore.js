import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.items.find((item) => item.id === product.id)) {
        this.items.push(product);
        this.saveToLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    clearWishlist() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
    syncWithAPI(apiItems) {
      this.items = apiItems;
      this.saveToLocalStorage();
    }
  },
  getters: {
    itemCount() {
      return this.items.length;
    },
  },
});
