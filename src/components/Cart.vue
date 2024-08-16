<script setup>
import { useCartStore } from '../lib/CartStore';

const { cart, removeFromCart, clearCart } = useCartStore();
</script>

<template>
    <div class="cart">
      <h2>Your Cart</h2>
      <div v-if="cart.length === 0">Your cart is empty</div>
      <ul v-else>
        <li v-for="item in cart" :key="item.id">
          <img :src="item.image" alt="product image" />
          <div>{{ item.title }} ({{ item.quantity }})</div>
          <div>$ {{ item.price }}</div>
          <button @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
      <button v-if="cart.length > 0" @click="clearCart">Clear Cart</button>
    </div>
  </template>