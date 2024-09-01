<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProductStore } from '../lib/ProductStore';
import Sorting from '../components/Sorting.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import { useCartStore } from '../lib/CartStore';
import { useComparisonStore } from '../lib/ComparisonStore';
import { useWishlistStore } from '../lib/WishListStore';

const { addToWishlist } = useWishlistStore();
const { addToComparison, comparisonList } = useComparisonStore();
const { addToCart } = useCartStore();
const { setCategory, setSortOption, resetFilters, getCategory, getSortOption } = ProductStore();

const products = ref([]);
const filteredProducts = ref([]);
const loading = ref(true);
const router = useRouter();
const route = useRoute();

const fetchData = async (category = '', sort = '') => {
  loading.value = true;
  const url1 = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : 'https://fakestoreapi.com/products';

  try {
    const response = await fetch(url1);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    let combinedData = [...data];

    if (sort) {
      combinedData = applySort(combinedData, sort);
    }

    combinedData = combinedData.map(item => ({
      ...item,
      images: item.images || [item.image], // Ensure 'images' array exists
    }));

    products.value = [...combinedData];
    filteredProducts.value = [...combinedData];
  } catch (err) {
    console.error(err);
    products.value = [];
    filteredProducts.value = [];
  } finally {
    loading.value = false;
  }
};

function applySort(data, sortOption) {
  return [...data].sort((a, b) => {
    if (sortOption === 'asc') return a.price - b.price;
    if (sortOption === 'desc') return b.price - a.price;
    return 0;
  });
}

function handleCategoryChange(category) {
  setCategory(category);
  router.push({ query: { ...route.query, category } });
  fetchData(category, getSortOption.value);
}

function handleSortChange(option) {
  setSortOption(option);
  router.push({ query: { ...route.query, sort: option } });
  fetchData(getCategory.value, option);
}

function handleReset() {
  resetFilters();
  router.push({ query: {} });
  fetchData();
}

onMounted(() => {
  const { category, sort } = route.query;
  if (category) {
    setCategory(category);
  }
  if (sort) {
    setSortOption(sort);
  }
  fetchData(getCategory.value, getSortOption.value);
});

watch([() => getCategory.value, () => getSortOption.value], ([newCategory, newSort]) => {
  fetchData(newCategory, newSort);
});

const handleAddToCart = (product) => {
  addToCart(product);
  alert(`${product.title} has been added to your cart.`);
};

function handleAddToComparison(product) {
  addToComparison(product);
}

</script>

<template>
  <div>
    <!-- Category and Sorting Components -->
    <CategoryFilter @categoryChange="handleCategoryChange" />
    <Sorting @sortChange="handleSortChange" @reset="handleReset" />

    <!-- Loading Indicator -->
    <div v-if="loading">Loading...</div>

    <!-- Product List -->
    <div v-else-if="filteredProducts.length" class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <router-link :to="`/product/${product.id}`" class="link">
          <img :src="product.images[0]" :alt="product.title" class="product-image" />
          <h2 class="product-title">{{ product.title }}</h2>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
        </router-link>
        <div class="button-group">
          <button @click="handleAddToCart(product)">
            <svg class="cart-icon" width="20px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="text" @click="handleAddToComparison(product)"><span class="text">Compare</span></button>
          <button @click="addToWishlist(product)"><span class="text">Wishlist</span></button>
        </div>
      </div>
    </div>

    <!-- No Products Available Message -->
    <p v-else>No products available.</p>
  </div>
</template>




<style scoped>
.text{
  color: #000;
}

.link{
  text-decoration: none;
}
.product-list{
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.product-card{
  border: 1px solid black;
  border-radius: 10px;
  width: 350px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center; 
  margin-top: 50px;
}

.product-title {
  color: #000;
  padding: 10px;
  font-size: 1.2em;
  margin-bottom: 10px;
  height: 60px;
}

.product-image {
  width: 200px;
  height: 280px;
  object-fit: contain;
  margin: 10px;
}

.product-price {
  font-size: 1.2em;
  color: #333;
  margin: 5px;
}

.product-category {
  font-size: 20px;
  color: #777;
}
.button-group {
  display: flex;
  width: 100%;
  gap: 5px; 
  margin-top: 5px;
}

.button-group button {
  flex: 1;
  margin: 5px;
  padding: 5px;
  background-color: #211f24;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.button-group button:hover {
  background-color: #70b599;
}

button:hover {
  background-color: #70b599;
  transform: translateY(-2px);
}

button:active {
  background-color: #3700b3;
  transform: translateY(0);
}

button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}

@media (max-width: 1200px) {
    .product-card {
      width: 300px;
      height: auto;
    }

    .product-image {
      width: 180px;
      height: 240px;
    }

    .product-title {
      font-size: 1.1em;
    }

    .product-price {
      font-size: 1.1em;
    }

    .product-category {
      font-size: 18px;
    }
  }

  @media (max-width: 992px) {
    .product-card {
      width: 250px;
      height: auto;
    }

    .product-image {
      width: 150px;
      height: 200px;
    }

    .product-title {
      font-size: 1em;
    }

    .product-price {
      font-size: 1em;
    }

    .product-category {
      font-size: 16px;
    }
  }

  @media (max-width: 768px) {
    .product-card {
      width: 100%;
      height: auto;
    }

    .product-image {
      width: 100%;
      height: auto;
    }

    .product-title {
      font-size: 0.9em;
    }

    .product-price {
      font-size: 0.9em;
    }

    .product-category {
      font-size: 14px;
    }
  }
</style>
