<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Login from './Login.vue';
import SkeletonLoader from './SkeletonLoader.vue';
import { useCartStore } from '../lib/CartStore';
import { useComparisonStore } from '../lib/ComparisonStore';
import { useWishlistStore } from '../lib/WishlistStore'; 

const { comparisonList } = useComparisonStore();
const { cart } = useCartStore();
const { itemCount } = useWishlistStore(); 

const isLoggedIn = ref(false);
const showLoginForm = ref(false);
const redirectTo = ref('');
const isScrolledUp = ref(true);
const showSkeleton = ref(false);

const router = useRouter();
let lastScrollTop = 0;

const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolledUp.value = currentScrollTop <= lastScrollTop;
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

const handleNavigation = (path) => {
  if (!isLoggedIn.value) {
    showLoginForm.value = true;
    redirectTo.value = path;
    showSkeleton.value = true;
  } else {
    router.push(path);
  }
};

const handleCartClick = () => handleNavigation('/cart');
const handleWishlistClick = () => handleNavigation('/wishlist');
const handleComparisonClick = () => handleNavigation('/comparison');

const handleLoginSuccess = () => {
  isLoggedIn.value = true;
  showLoginForm.value = false;
  showSkeleton.value = false;
  if (redirectTo.value) {
    router.push(redirectTo.value);
    redirectTo.value = '';
  }
};

const handleLogout = () => {
  isLoggedIn.value = false;
};

const closeLoginModal = () => {
  showLoginForm.value = false;
  showSkeleton.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="{ 'scrolled-up': isScrolledUp, 'scrolled-down': !isScrolledUp }">
    <nav class="container">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/planet-5-logo.png" class="logo" alt="Planet Logo" />
        </router-link>
      </div>

      <ul class="nav-menu">
        <li><router-link to="/">Products</router-link></li>
        <li>Offers</li>
        <li class="comparison-icon">
          <router-link to="/comparison" @click.prevent="handleComparisonClick">
            Comparison 
            <span class="comparison-badge">{{ comparisonList.length }}</span>
          </router-link>
        </li>
        <li class="wishlist-icon">
          <router-link to="/wishlist" @click.prevent="handleWishlistClick">
            Wishlist 
            <span class="wishlist-badge">{{ itemCount }} </span>
          </router-link>
        </li>
        <li class="cart-icon">
          <router-link to="/cart" @click.prevent="handleCartClick">
               <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>
               <span class="cart-badge">{{ cart.length }}</span>
          </router-link>
        </li>
      </ul>

      <div>
        <router-link v-if="!isLoggedIn" to="/login">
          <button class="login-btn">Login</button>
          
        </router-link>
        <button v-else @click="handleLogout" class="logout-btn">
          Logout
        </button>
      </div>

      <div v-if="showLoginForm">
        <Login @login-success="handleLoginSuccess" @close="closeLoginModal" />
      </div>
    </nav>

    <SkeletonLoader :show="showSkeleton" />
  </header>
</template>





<style scoped>
.login-btn,
.logout-btn{
  color: #1a1818;
  text-decoration: none;
  width: 60px;
  border-radius: 5px;
  border: none;
  
}
header {
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  height: 96px;
  transition: transform 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 
}

.skeleton-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.skeleton-content {
  width: 60%;
  height: 60%;
  background: #f0f0f0;
  border-radius: 4px;
}


header.scrolled-down {
  transform: translateY(-100%); 
}

header.scrolled-up {
  transform: translateY(0); 
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.logo {
  width: 250px;
  height: 70px;
  border-radius: 10px;
}

.nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.nav-menu li {
  margin-right: 20px;
}

.nav-menu a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-menu a:hover {
  color: #ffd700;
}

.cart-icon, 
.comparison-icon,
.wishlist-icon {
  position: relative;
}

.cart-badge, 
.comparison-badge,
.wishlist-badge {
  position: absolute;
  top: -8px;  
  right: -18px; 
  background-color: rgb(172, 112, 112); 
  color: white; 
  border-radius: 50%; 
  padding: 2px 6px; 
  font-size: 12px; 
  line-height: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: #333;
    width: 100%;
    text-align: center;
  }

  .nav-menu li {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .nav-menu a {
    padding: 10px;
    display: block;
  }

  .hamburger-menu {
    display: block;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>
