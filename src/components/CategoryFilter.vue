<script setup>
import { ref, onMounted, defineEmits } from 'vue';

/**
 * Emits events to parent component.
 * @typedef {Object} Emits
 */
const emit = defineEmits(['categoryChange']);


/**
 * Reactive reference to store the list of categories.
 * @type {import('vue')}
 */
const categories = ref([]);

/**
 * Reactive reference to store the currently selected category.
 * @type {import('vue')}
 */
const selectedCategory = ref('');

onMounted(async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    categories.value = [...new Set(products.map(product => product.category))];
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
});


/**
 * Handles changes in the category selection dropdown.
 * Updates the selectedCategory reference and emits the categoryChange event
   with the selected category.
 * @param {Event} event - The change event from the category selection dropdown.
 */
function handleChange(event) {
  const category = event.target.value;
  selectedCategory.value = category;
  emit('categoryChange', category); 
}
</script>

<template>
   <span class="category-filter">
       <select class="selector" @change="handleChange">
         <option value="">All Categories</option>
         <option v-for="category in categories" :key="category" :value="category">
           {{ category }}
         </option>
       </select>
   </span>
</template>

<style scoped>
  .category-filter {
    height: 30px;
    width: 200px;
    margin-left: auto;
    margin-top: 50px;
    border-radius: 5px;
  }

  .selector {
    margin-top: 20px;
    width: 200px;
    height: 40px;
    margin-left: auto;
    padding: 10px;
    background-color: rgb(66, 75, 86);
    margin-top: 20px;
    border-radius: 5px;
    align-items: center; 
    justify-content: center;
    font-weight: bold;
    color: #efe8e8; 
  }

  @media (max-width: 1200px) {
    .category-filter {
      width: 90%;
      height: 35px;
      margin-left: 0px;
    }

    .selector {
      width: 90%;
      margin-left: 0px;
      margin-top: 10px;
      border-radius: 5px;
    }
  }

  @media (max-width: 992px) {
    .category-filter {
      width: 90%;
      height: 30px;
      margin-left: 0px;
    }

    .selector {
      width: 90%;
      margin-left: 0px;
      padding: 8px;
      border-radius: 5px;
    }
  }

  @media (max-width: 768px) {
    .category-filter {
      width: 80px;
      height: 25px;
      margin: 5px;
      
    }

    .selector {
      width: 90%;
      margin-left: 0px;
      padding: 6px;
      margin-top: 10px;
      border-radius: 5px;
    }
  }

  @media (max-width: 480px) {
    .category-filter,
    .selector {
      width: 90%;
      margin-left: 0;
      margin-right: 0;
      padding: 4px;
      margin-top: 5px;
      border-radius: 5px;
    }

    .selector {
      height: auto; 
    }
  }
</style>

