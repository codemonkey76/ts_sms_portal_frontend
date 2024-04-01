import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/AuthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
  ]
})

import { useAuthStore } from '@/stores/auth'

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  console.log("isAuthenticated", authStore.isAuthenticated);
  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  }
  else {
    next();
  }
});
export default router
