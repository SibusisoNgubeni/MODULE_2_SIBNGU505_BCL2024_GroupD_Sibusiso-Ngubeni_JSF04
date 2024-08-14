
/**
 * @module router
 * @description Configures the Vue Router for the application.
 */
import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../pages/ProductsList.vue';
import DetailedProductView from '../pages/DetailedProductView.vue';

/**
 * Defines the routes for the application.
 * @type {Array<Object>}
 * @property {string} path - The URL path for the route.
 * @property {Object} component - The Vue component to render for the route.
 * @property {boolean} [props] - Pass route params as props to the component (optional).
 */
const routes = [
    { path: '/', component: ProductList },
    { path: '/product/:id', component: DetailedProductView, props: true }
  ];
  
  /**
 * Creates and configures a Vue Router instance.
 * @function
 * @returns {Object} The configured Vue Router instance.
 */
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;