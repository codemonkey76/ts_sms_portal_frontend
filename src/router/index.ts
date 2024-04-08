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
      path: '/register',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
          meta: { requiresGuest: true }
        }
      ]
    },
    {
      path: '/verify-email',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'verify-email',
          component: () => import('@/views/VerifyEmailView.vue'),
          meta: { requiresAuth: true }
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
          meta: { requiresAuth: true, requiresVerified: true }
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
  verified: boolean;
}

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiresVerified = to.matched.some(record => record.meta.requiresVerified);

  if (!requiresAuth && !requiresGuest) {
    next();
    return;
  }

  axios.get('/auth/check-session')
    .then(response => {
      const data = response.data as CheckSessionResponse;

      if (data.loggedIn) {
        authStore.login();

        if (requiresVerified)
        if (data.verified) {
          next();
          return;
        }



      }
      else {
        authStore.logout();



      }

      if (!data.verified) {
        next('/verify-email')
        return;
      }

      if (requiresGuest) {
        next('/');
      } else {
        next();
      }

    })
    .catch(_ => {
      authStore.logout();

      if (requiresAuth) {
        next('/login');
      } else {
        next();
      }
    });
});
export default router
