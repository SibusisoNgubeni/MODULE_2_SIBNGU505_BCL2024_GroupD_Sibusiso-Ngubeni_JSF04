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
          <td v-for="product in comparisonList" :key="'remove-' + product.id">
            <button @click="handleRemove(product.id)">Remove</button>
          </td>
          <td v-for="product in comparisonList" :key="'image-' + product.id">
            <img :src="product.images[0]" :alt="product.title" class="comparison-image" />
          </td>
        </tr>
        <tr>
          <td></td>
          <td v-for="product in comparisonList" :key="'description-' + product.id">{{ product.description }}</td>
        </tr>
        <tr>
          <td></td> 
          <td v-for="product in comparisonList" :key="'price-' + product.id">{{ product.price }}</td>
        </tr>
        <tr>
          <td></td> 
          <td v-for="product in comparisonList" :key="'rating-' + product.id">{{ product.rating.rate }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No items in comparison list.</p>
  </div>
</template>


<style scoped>

.comparison-page{
    margin-top: 100px;
}
.comparison-image {
  max-width: 100px; 
  height: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 10px;
}
img {
  width: 100px;
}
</style>
