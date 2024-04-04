<script setup lang="ts">
import { useRouter } from 'vue-router'
import {

  Menu,
  MenuButton,
  MenuItem,
  MenuItems,

} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'

const router = useRouter()

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
  <div class="bg-white h-20 border-b flex items-center justify-between px-10">
    <span class="text-xl font-montserrat font-light">Dashboard</span>
    <span>

      <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img class="h-10 w-10 rounded-full object-cover" src="https://ui-avatars.com/api/?name=A+U&amp;color=7F9CF5&amp;background=EBF4FF" alt="Profile Logo">
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm leading-6 text-gray-900" aria-hidden="true">Tom Cook</span>
                  <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <MenuItem v-for="item in userNavigation" :key="item.label" v-slot="{ active }">
                    <button @click="handleMenuItemClick(item)" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">{{ item.label }}</button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
    </span>
  </div>
</template>