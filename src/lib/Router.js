
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
import ComparisonPage from '../pages/ComparisonPage.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: DetailedProductView, props: true },
  { path: '/cart', component: Cart, meta: { requiresAuth: true} },
  { path: '/comparison', component: ComparisonPage},
  { path: '/login', component: Login },
  { path: '/logout', component: Logout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user.value) {
    authStore.setLoginModalVisible(true);
    next(false);
  } else {
    next();
  }
});

export default router;


