<script setup>
import { useComparisonStore } from '../lib/ComparisonStore';

const { comparisonList, removeFromComparison, clearComparison } = useComparisonStore();

function handleRemove(productId) {
  removeFromComparison(productId);
}

function handleClear() {
  clearComparison();
}
</script>


<template>
    <div class="comparison-page">
      <h1>Comparison Page</h1>
      <button @click="handleClear">Clear Comparison List</button>
  
      <table v-if="comparisonList.length > 0">
        <thead>
          <tr>
            <th></th> 
            <th v-for="product in comparisonList" :key="product.id">{{ product.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td v-for="product in comparisonList" :key="'image-' + product.id">
              <img :src="product.images[0]" :alt="product.title" class="comparison-image" />
              <button @click="handleRemove(product.id)">Remove</button>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td v-for="product in comparisonList" :key="'description-' + product.id">{{ product.description }}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td v-for="product in comparisonList" :key="'price-' + product.id">{{ product.price }}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td v-for="product in comparisonList" :key="'rating-' + product.id">{{ product.rating.rate }}</td>
          </tr>
        </tbody>
      </table>
  
      <p v-else>No items in comparison list.</p>
    </div>
  </template>


<style scoped>
/* Main container styling */
.comparison-page {
  margin-top: 100px;
  padding: 20px;
  background-color: #f9f9f9;
  font-family: 'Arial', sans-serif;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* Table header styling */
th {
  background-color: #333;
  color: white;
  font-weight: bold;
  padding: 15px;
  text-align: left;
}

/* Table row styling */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

/* Table cell styling */
th, td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
}

/* Image styling */
img {
  max-width: 80px;
  height: auto;
  border-radius: 5px;
  transition: transform 0.3s ease-in-out;
}

img:hover {
  transform: scale(1.1);
}

/* Add spacing between sections */
.section {
  margin-bottom: 30px;
}

/* Button styling */
button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #333;
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  th, td {
    padding: 10px;
    font-size: 14px;
  }

  img {
    max-width: 60px;
  }
}
</style>
