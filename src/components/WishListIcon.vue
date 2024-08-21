<script setup>
import { ref } from 'vue';

const wishlistCount = ref(0);

const handleWishlistClick = () => {
    wishlistCount.value += 1;
};

</script>
  

  <template>
    <div>
      <button @click="handleWishlistClick">Wishlist ({{ wishlistCount }})</button>
    </div>
  </template>


  <style scoped>
  .wishlist-icon {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .item-count {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 12px;
  }
  </style>
  