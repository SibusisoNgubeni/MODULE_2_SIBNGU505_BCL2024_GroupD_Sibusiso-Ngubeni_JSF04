<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ProductStore } from '../lib/ProductStore';
import Sorting from '../components/Sorting.vue';
import CategoryFilter from '../components/CategoryFilter.vue';
import { defineProps } from 'vue';
import { useCartStore } from '../lib/CartStore';

const { addToCart } = useCartStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

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

  const url2 = 'https://api.escuelajs.co/api/v1/products';

  try {
    const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)]);

    if (!response1.ok || !response2.ok) {
      throw new Error('Network response was not ok');
    }

    const data1 = await response1.json();
    const data2 = await response2.json();

    let combinedData = [...data1, ...data2];

    if (category) {
      combinedData = combinedData.filter(item => {
        if (item.category && item.category.name) {
          return item.category.name.toLowerCase() === category.toLowerCase();
        } else if (typeof item.category === 'string') {
          return item.category.toLowerCase() === category.toLowerCase();
        }
        return false;
      });
    }

    if (sort) {
      combinedData = applySort(combinedData, sort);
    }

    combinedData = combinedData.map(item => ({
      ...item,
      images: item.images || [item.image],
    }));

    products.value = combinedData;
    filteredProducts.value = combinedData;
  } catch (err) {
    console.error(err);
    products.value = [];
    filteredProducts.value = [];
  } finally {
    loading.value = false;
  }
};

function applySort(data, sortOption) {
  switch (sortOption) {
    case 'asc':
      return [...data].sort((a, b) => a.price - b.price);
    case 'desc':
      return [...data].sort((a, b) => b.price - a.price);
    default:
      return data;
  }
}

function applyFilters(sort = '') {
  const filtered = [...products.value];

  if (sort === 'asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  filteredProducts.value = filtered;
}

function handleCategoryChange(category) {
  setCategory(category);
  router.push({ query: { ...route.query, category } });
  fetchData(category, getSortOption.value);
}

function handleSortChange(option) {
  setSortOption(option);
  router.push({ query: { ...route.query, sort: option } });
  applyFilters(option);
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

watch(() => getCategory.value, newCategory => {
  fetchData(newCategory, getSortOption.value);
});

watch(() => getSortOption.value, newSort => {
  applyFilters(newSort);
});

const handleAddToCart = () => {
  addToCart(product);
};
</script>

<template>
  <div>
    <CategoryFilter @categoryChange="handleCategoryChange" />
    <Sorting @sortChange="handleSortChange" @reset="handleReset" />
    <div v-if="filteredProducts.length" class="product-list">
      <router-link :to="`/product/${product.id}`" v-for="product in filteredProducts" :key="product.id" class="link">
        <div :key="product.id" class="product-card">
          <img :src="product.images[0]" :alt="product.title" class="product-image" />
          <h2 class="product-title">{{ product.title }}</h2>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
          <button @click="handleAddToCart(product)">Add to Cart</button>
        </div>
      </router-link>
    </div>
    <p v-else>Loading...</p>
  </div>
</template>


<style scoped>
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