<script setup>
import { useWishlistStore } from '../lib/WishlistStore';
import { useCartStore } from '../lib/cartStore'; 
const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
const { addToCart } = useCartStore();
</script>


<template>
    <div class="wishlist-page">
      <h1>Your Wishlist</h1>
      <button @click="clearWishlist">Clear Wishlist</button>
  
      <table v-if="items.length > 0">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><img :src="item.image" alt="Product Image" /></td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button @click="removeFromWishlist(item.id)">Remove</button>
              <button @click="addToCart(item)">Add to Cart</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-else>Your wishlist is empty.</p>
    </div>
  </template>
  
 
  
  <style scoped>
  .wishlist-page {
  margin-top: 100px;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

button:hover {
  background-color: #45a049;
}
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
}

thead {
  background-color: #4CAF50;
  color: white;
}

th, td {
  padding: 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ddd;
}

img {
  max-width: 80px;
  height: auto;
  border-radius: 5px;
}
p {
  color: #666;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

  </style>
  