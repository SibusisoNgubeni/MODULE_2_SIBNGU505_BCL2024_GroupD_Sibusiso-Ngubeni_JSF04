<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../lib/CartStore';

const { addToCart } = useCartStore();
const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(null);
const saleEndDate = ref('');

const apiBaseUrl = route.query.api || 'fakestore';

const fetchProduct = async () => {
  const id = parseInt(route.params.id, 10);
  let url = '';

  if (apiBaseUrl === 'fakestore') {
    url = `https://fakestoreapi.com/products/${id}`;
  } else if (apiBaseUrl === 'escuela') {
    url = `https://api.escuelajs.co/api/v1/products/${id}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    product.value = await response.json();

    // Calculate sale end date if applicable
    if (apiBaseUrl === 'fakestore' && product.value.discountPercentage) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 30) + 1);
      saleEndDate.value = endDate.toDateString();
    } else if (apiBaseUrl === 'escuela') {
      saleEndDate.value = ''; // No discount handling for Escuela API
    }

  } catch (err) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProduct);

function getRatingStars(rate) {
  const totalStars = 5;
  const filledStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  return Array(totalStars).fill(false).map((_, index) => {
    if (index < filledStars) return 'filled';
    if (index === filledStars && hasHalfStar) return 'half';
    return 'empty';
  });
}

const handleAddToCart = (product) => {
  addToCart(product);
};
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">
      <p>Error: {{ error }}</p>
    </div>

    <div v-else>
      <router-link to="/">
        <button class="return-btn">Back to products</button>
      </router-link>

      <div class="product-detail">
        <div class="product-card">
          <div class="product-title">{{ product.title }}</div>
          <div>
            <img :src="apiBaseUrl === 'fakestore' ? product.image : (product.images && product.images[0])" alt="Product Image" class="product-image"/>
          </div>
        </div>

        <div class="info-block">
          <div class="product-category">
            {{ apiBaseUrl === 'fakestore' ? product.category : (product.category && product.category.name) }}
          </div>

          <div v-if="apiBaseUrl === 'fakestore' && product.discountPercentage" class="discount-info">
            <p class="original-price">$ {{ product.originalPrice }}</p>
            <p class="discounted-price">$ {{ product.discountedPrice }}</p>
            <p class="discount-percentage">{{ product.discountPercentage }}% OFF</p>
            <p>Sale Ends: {{ saleEndDate }}</p>
          </div>

          <div v-else class="product-price">
            $ {{ product.price }}
          </div>

          <div class="product-description">{{ product.description }}</div>

          <div v-if="apiBaseUrl === 'fakestore'" class="rating">
            <span class="rating-rate">{{ product.rating ? product.rating.rate : 'N/A' }}</span>
            <span v-for="(star, index) in getRatingStars(product.rating ? product.rating.rate : 0)" :key="index">
              <svg
                :class="['rating-star', star]"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                style="width: 20px; height: 20px;"
                aria-hidden="true"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </span>
            <div class="rating-text">
              <span class="rating-count">{{ product.rating ? product.rating.count : 'N/A' }} ratings</span>
            </div>
          </div>

          <button @click="handleAddToCart(product)">
            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .return-btn {
    height: 40px;
    border-radius: 5px;
    background-color: #e6d9d9;
    margin-top: 10px;
    border: 0.5px solid #87b4db;
  }

  .product-detail{
    display: flex;
    justify-content: center;
    margin: 10px;
    }

  .product-card{
    display: flex;
    border: 0px solid black;
    border-radius: 10px;
    width: 500px;
    height: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 50px;
    margin-right: 10px;
    background-color: #e6d9d9;
    }

  .product-title {
    font-weight: bold;
    margin-top: 20px;
    padding: 10px;
    font-size: 1.2em;
    margin-bottom: 10px;
    height: 60px;
    }

  .product-image {
    width: 400px;
    height: 400px;
    object-fit: contain;
    margin-bottom: 10px;
    border-radius: 20px;
    }

  .product-price {
    font-weight: bold;
    padding: 10px;
    margin-top: 20px;
    font-size: 1.2em;
    color: #262424;
    margin-bottom: 10px;
    }

  .product-category {
    font-size: 20px;
    color: #535353;
    margin: 20px;
    }

  .product-description{
    font-size: 18px;
    color: #000000;
    margin-bottom: 20px;
    padding: 10px;
    }
    
  .info-block{
    display: flex;
    border-radius: 10px;
    width: 500px;
    height: 500px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 50px;
    margin-right: 10px;
    background-color: #e6d9d9;
    }

  .buy-block{
    display: flex;
    border-radius: 10px;
    width: 300px;
    height: 300px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 50px;
    background-color: #e6d9d9;
    }

    .rating {
    display: flex;
    align-items: center;
    gap: 2px; 
    margin-top: 30px;
    
  }
  
  .rating-star {
    width: 20px;
    height: 20px;
    
  }
  
  .rating-star.filled {
    fill: gold;
  }
  
  .rating-star.half {
    fill: linear-gradient(to right, gold 50%, rgb(0, 0, 0) 50%);
  }
  
  .rating-star.empty {
    fill: rgb(0, 0, 0);
  }
  
  .rating-text {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
  }

  .rating-rate {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }

  .rating-count {
    display: block;
    font-size: 14px;
    color: gray;
    margin-left: 20px;
  }
  
  @media (max-width: 1200px) {
    .product-card, .info-block {
      width: 400px;
      height: 400px;
    }

    .buy-block {
      width: 250px;
      height: 250px;
    }
  }

  @media (max-width: 992px) {
    .product-card, .info-block {
      width: 300px;
      height: 300px;
    }

    .buy-block {
      width: 200px;
      height: 200px;
    }

    .product-detail {
      flex-direction: column;
      margin: 5px;
    }
  }

  @media (max-width: 768px) {
    .product-card, .info-block, .buy-block {
      width: 100%;
      height: auto;
    }

    .product-title {
      font-size: 1em;
    }

    .product-image {
      width: 100%;
      height: auto;
    }

    .product-price {
      font-size: 1em;
    }

    .product-category {
      font-size: 18px;
    }

    .product-description {
      font-size: 16px;
    }

    .return-btn {
      width: 100%;
      height: 35px;
      margin-top: 5px;
    }
  }
</style>
