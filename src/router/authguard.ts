interface RouteMeta {
  requiresAuth?: boolean;
  requiresGuest?: boolean;
  requiresVerified?: boolean;
  permission?: string | null;
}
import { useAuthStore } from '@/stores/auth'
import type { ValidateSessionResponse } from '@/types/ValidateSessionResponse'
import axios from 'axios';
import type { NavigationGuard } from 'vue-router';

export const authGuard: NavigationGuard = async (to, _, next) => {
  const auth = useAuthStore();
  const { requiresAuth, requiresGuest, requiresVerified, permission } = to.matched.reduce((meta, record) => {
    return {
      requiresAuth: record.meta.requiresAuth === undefined ? meta.requiresAuth : record.meta.requiresAuth,
      requiresGuest: record.meta.requiresGuest === undefined ? meta.requiresGuest : record.meta.requiresGuest,
      requiresVerified: record.meta.requiresVerified === undefined ? meta.requiresVerified : record.meta.requiresVerified,
      permission: record.meta.permission || meta.permission
    };

  }, { requiresAuth: false, requiresGuest: false, requiresVerified: false, permission: null } as RouteMeta);
  try {
    if (!requiresAuth && !requiresGuest && !requiresVerified && !permission) {
      next();
      return;
    }
    const response = await axios.get('/auth/validate-session');
    const data = response.data.data as ValidateSessionResponse;

    if (data.loggedIn) {
      auth.login(data.user);

      if (requiresGuest) {
        next('/');
        return;
      }

      if (requiresVerified && !data.verified) {
        next('/verify-email');
        return;
      }

      if (permission && !auth.can(permission)) {
        next('/unauthorized');
        return;
      }
      next();
    } else {
      auth.logout();
      if (requiresAuth || requiresVerified) {
        next('/login');
        return;
      }

      if (permission) {
        next('/unauthorized');
        return;
      }

      next();
    }

  } catch (error) {
    console.error("Error during session validation", error);
    auth.logout();
    auth.setError("Unable to check if user session exists!<br>Server may be down, try again later.");
    next('/error');
  }
}

