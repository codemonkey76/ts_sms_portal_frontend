import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

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
          component: () => import('@/views/LoginView.vue'),
          meta: { requiresGuest: true }
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
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/UsersView.vue'),
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

router.beforeEach((to, _, next) => {
  const requiresSessionCheck = to.matched.some(record => record.meta.requiresGuest) || to.matched.some(record => record.meta.requiresAuth);

  if (!requiresSessionCheck) {
    next();
    return;
  }


  axios.get('/auth/check-session')
    .then(response => {
      const data = response.data as CheckSessionResponse;
      if (data.loggedIn) {
        useAuthStore().login();
        if (to.matched.some(record => record.meta.requiresGuest)) {
          next('/home');
        } else {
          next();
        }
      }
    })
    .catch(_ => {
      useAuthStore().logout();
      if (to.path !== '/login') {
        next('/login');
      } else {
        next();
      }
    });
});
export default router
