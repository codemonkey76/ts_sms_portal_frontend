<script lang="ts" setup>
import { useRouter } from 'vue-router'
import {

  Menu,
  MenuButton,
  MenuItem,
  MenuItems,

} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore();

type NavLink = {
  label: string;
  path?: string;
  action?: () => void;
  requiresConfirmation?: boolean;
}

const userNavigation: NavLink[] = [
  { label: 'Your profile', path: '/profile' },
  {
    label: 'Sign out', action: async () => {
      try {
        await axios.post('/auth/logout');
        await router.replace('/login');
      } catch (error) {
        console.error('Logout failed.', error);
      }
    }
  }
];

const handleMenuItemClick = (item: NavLink) => {
  if (item.path) {
    router.push(item.path);
  } else if (item.action) {
    if (item.requiresConfirmation) {
      if (confirm('Are you sure you want to sign out?')) {
        item.action();
      }
    } else {
      item.action();
    }
  }
}

</script>
<template>
  <div class="dark:bg-gray-800 bg-white h-20 border-b dark:border-gray-600 flex items-center justify-between px-10">
    <span class="text-xl font-montserrat font-light dark:text-gray-300">Dashboard</span>
    <div class="flex items-center space-x-2">
      <Menu as="div" class="relative">
        <MenuButton class="-m-1.5 flex items-center p-1.5">
          <span class="sr-only">Open user menu</span>
          <img alt="Profile Logo" class="h-10 w-10 rounded-full object-cover"
            src="https://ui-avatars.com/api/?name=A+U&amp;color=7F9CF5&amp;background=EBF4FF">
          <span class="hidden lg:flex lg:items-center">
            <span aria-hidden="true" class="ml-4 text-sm leading-6 text-gray-900">{{ auth.user_data?.user.name }}</span>
            <ChevronDownIcon aria-hidden="true" class="ml-2 h-5 w-5 text-gray-400" />
          </span>
        </MenuButton>
        <transition enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <MenuItems
            class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <MenuItem v-for="item in userNavigation" :key="item.label" v-slot="{ active }">
            <button :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
              @click="handleMenuItemClick(item)">{{ item.label
              }}</button>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
