import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './authguard'
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

const router = createRouter({
  history: createWebHistory(''),
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
      path: '/forgot-password',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'forgot-password',
          component: () => import('@/views/ForgotPassword.vue'),
          meta: { requiresGuest: true }
        }
      ]
    },
    {
      path: '/reset-password',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'reset-password',
          component: () => import('@/views/ResetPassword.vue'),
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
      path: '/error',
      component: () => import('@/layouts/UnauthenticatedLayout.vue'),
      children: [
        {
          path: '',
          name: 'error',
          component: () => import('@/views/ErrorView.vue'),
          meta: {}
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
          meta: { requiresVerified: true }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/UsersView.vue'),
          meta: { permission: 'users:list', requiresVerified: true }
        },
        {
          path: 'customers',
          name: 'customers',
          component: () => import('@/views/CustomersView.vue'),
          meta: { permission: 'customers:list', requiresVerified: true }
        },
        {
          path: '/sms',
          children: [
            {
              path: 'quick',
              name: 'quick-sms',
              component: () => import('@/views/sms/QuickSmsView.vue'),
              meta: { permission: 'sms:send', requiresVerified: true }
            }
          ]

        }

      ]
    },
  ]
})

router.beforeEach(authGuard)

export default router
