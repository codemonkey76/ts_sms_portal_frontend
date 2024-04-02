import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
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

interface CheckSessionResponse {
  loggedIn: boolean;
}

router.beforeEach((to, _from, next) => {
  axios.get('/auth/check-session')
    .then(response => {
      const data = response.data as CheckSessionResponse;
      if (data.loggedIn) {
        useAuthStore().login();
        if (to.path === '/login') {
          next('/home');
        } else {
          next();
        }
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          next('/login');
        } else {
          console.error('Session check failed:', error);
          next('/login');
        }
      }
    });
});
export default router
