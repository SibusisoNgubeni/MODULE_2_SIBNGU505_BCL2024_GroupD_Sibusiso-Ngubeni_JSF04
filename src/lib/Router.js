
/**
 * @module router
 * @description Configures the Vue Router for the application.
 */
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../pages/ProductsList.vue';
import DetailedProductView from '../pages/DetailedProductView.vue';

import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import { useAuthStore } from '../lib/LoginStore';
import Cart from '../components/Cart.vue';



/**
 * Defines the routes for the application.
 * @type {Array<Object>}
 * @property {string} path - The URL path for the route.
 * @property {Object} component - The Vue component to render for the route.
 * @property {boolean} [props] - Pass route params as props to the component (optional).
 */
const routes = [
    { path: '/', component: ProductList },
    { path: '/product/:id', component: DetailedProductView, props: true },
    { path: '/cart', component: Cart},
    { path: '/login', component: Login },
    { path: '/logout', component: Logout },
  ];
  
  /**
 * Creates and configures a Vue Router instance.
 * @function
 * @returns {Object} The configured Vue Router instance.
 */
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.user.value) {
      authStore.setLoginModalVisisble(true);
      next(false);
      } else {
        next();
    }
  });
  
  export default router;