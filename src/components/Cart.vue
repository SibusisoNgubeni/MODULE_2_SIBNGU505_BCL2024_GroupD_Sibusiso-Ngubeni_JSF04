<script setup>
import { computed } from 'vue';
import { useCartStore } from '../lib/CartStore';

const { cart, removeFromCart, clearCart } = useCartStore();

const safeCart = computed(() => cart.value || []);

const totalItems = computed(() => {
  return safeCart.value.reduce((total, item) => total + item.quantity, 0);
});
</script>

<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <div v-if="safeCart.value.length === 0">Your cart is empty</div>
    <ul v-else>
      <li v-for="item in safeCart.value" :key="item.id">
        <img :src="item.images && item.images[0] ? item.images[0] : ''" alt="product image" />
        <div>{{ item.title }} ({{ item.quantity }})</div>
        <div>$ {{ item.price.toFixed(2) }}</div>
        <button @click="removeFromCart(item.id)">Remove</button>
      </li>
    </ul>
    <button v-if="safeCart.value.length > 0" @click="clearCart">Clear Cart</button>
    <div v-if="safeCart.value.length > 0">
      <strong>Total Items: {{ totalItems }}</strong>
    </div>
  </div>
</template>
