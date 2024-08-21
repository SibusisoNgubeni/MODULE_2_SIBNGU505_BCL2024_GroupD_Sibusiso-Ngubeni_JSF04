<script setup>
import { computed } from 'vue';
import { useCartStore } from '../lib/CartStore';

const { cart, removeFromCart, clearCart } = useCartStore();

const safeCart = computed(() => cart.value || []);

const totalItems = computed(() => {
  return safeCart.value.reduce((total, item) => total + item.quantity, 0);
});

const itemTotalPrice = (item) => {
  return item.price * item.quantity;
};

const grandTotal = computed(() => {
  return safeCart.value.reduce((total, item) => total + itemTotalPrice(item), 0).toFixed(2);
});

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};
</script>


<template>
    <div class="cart-container">
      <h2 class="cart-title">Your Shopping Cart</h2>
  
      <div v-if="safeCart.length === 0" class="empty-cart">
        Your cart is empty.
      </div>
  
      <ul v-else class="cart-list">
        <li v-for="item in safeCart" :key="item.id" class="cart-item">
          <div class="cart-item-image">
            <img :src="item.images && item.images[0] ? item.images[0] : ''" alt="product image" />
          </div>
          <div class="cart-item-details">
            <h3>{{ item.title }}</h3>
            <p class="item-price">Unit Price: $ {{ item.price.toFixed(2) }}</p>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <p class="item-total-price">Total: $ {{ itemTotalPrice(item).toFixed(2) }}</p>
          </div>
          <button class="remove-button" @click="removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
  
      <div v-if="safeCart.length > 0" class="cart-summary">
        <div class="subtotal">
          <strong>Total Items:</strong> {{ totalItems }}
        </div>
        <div class="checkout">
          <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
          <button class="checkout-button">
            Proceed to Checkout - Total: $ {{ grandTotal }}
          </button>
        </div>
      </div>
    </div>
  </template>
  


<style scoped>
.cart-container {
    width: 90%;
    max-width: 1200px;
    margin-top: 100px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .cart-title {
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 18px;
    color: #999;
  }
  
  .cart-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  
  .cart-item:last-child {
    border-bottom: none;
  }
  
  .cart-item-image img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .cart-item-details {
    flex: 1;
    margin-left: 20px;
  }
  
  .cart-item-details h3 {
    margin: 0;
    font-size: 18px;
  }
  
  .item-price {
    margin-top: 8px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .item-quantity {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  
  .item-quantity button {
    width: 30px;
    height: 30px;
    border: none;
    background-color: #ddd;
    font-size: 18px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .item-quantity span {
    margin: 0 10px;
    font-size: 16px;
  }
  
  .remove-button {
    margin-left: 20px;
    padding: 8px 12px;
    border: none;
    background-color: #ff4d4d;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .remove-button:hover {
    background-color: #e60000;
  }
  
  .cart-summary {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 1px solid #ddd;
  }
  
  .subtotal {
    font-size: 18px;
    font-weight: bold;
  }
  
  .clear-cart-button,
  .checkout-button {
    padding: 10px 20px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .clear-cart-button {
    background-color: #ddd;
    color: #333;
  }
  
  .checkout-button {
    background-color: #007bff;
    color: #fff;
    margin-left: 10px;
  }
  
  .checkout-button:hover {
    background-color: #0056b3;
  }
  .item-total-price {
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
  
  </style>