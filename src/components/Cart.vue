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
              <button @click="decreaseQuantity(item)">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 6H11M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></button>
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
    background-color: #333;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .remove-button:hover {
    background-color: #333;
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
    background-color: #333;
    color: #fff;
    margin-left: 10px;
  }
  
  .checkout-button:hover {
    background-color: #333;
  }
  .item-total-price {
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
  
  </style>
