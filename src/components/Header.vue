<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolledUp = ref(true);
let lastScrollTop = 0;
const headerHeight = 96; // Adjust if your header height changes

const handleScroll = () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop) {
    // Scrolling down
    isScrolledUp.value = false;
  } else {
    // Scrolling up
    isScrolledUp.value = true;
  }
  
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
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
        <img src="../assets/planet-5-logo.png" class="logo" alt="planet Logo">
      </div>
      <ul class="nav-menu">
        <li><a href="#">Products</a></li>
        <li><a href="#">Offers</a></li>
        <li><a href="#">Categories</a></li>
        <li><a href="#">Wishlist</a></li>
        <li><a href="#">Cart</a></li>
      </ul>
      <div class="hamburger-menu">&#9776;</div>
      <div class="login">Login</div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  height: 96px;
  transition: transform 0.3s ease;
  position: fixed; /* Ensure the header stays fixed */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure it stays on top of other content */
}

header.scrolled-down {
  transform: translateY(-100%); /* Hide the navbar */
}

header.scrolled-up {
  transform: translateY(0); /* Show the navbar */
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
