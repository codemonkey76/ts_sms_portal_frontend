<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import IconChevronLeft from './icons/IconChevronLeft.vue'
import IconLogo from './icons/IconLogo.vue'
import * as HeroIcons from '@heroicons/vue/24/solid'

const getIconComponent = (iconName: string|undefined) => {
  console.log("Trying to get icon component", iconName)
  if (!iconName) return null
  return HeroIcons[iconName+"Icon"]
}

const sidebarOpen = ref(true)
const itemsShown = ref(true)
const transitioning = ref(false)

const toggleSidebar = () => {
  if (!transitioning.value) {
    transitioning.value = true
    if (sidebarOpen.value) {
      itemsShown.value = false
      setTimeout(() => {
        sidebarOpen.value = false
        transitioning.value = false
      }, 150)
    } else {
      sidebarOpen.value = true
      setTimeout(() => {
        itemsShown.value = true
        transitioning.value = false
      }, 150)
    }
  }
}

type MenuItem = {
  id: string
  title: string
  expandable: boolean
  isOpen?: boolean
  link?: string
  icon?: string
  permissions?: string | string[]
  children?: MenuItem[]
}

type Menu = MenuItem[]

const menu: Menu = [
  {
    id: '1',
    title: 'Dashboard',
    expandable: false,
    link: '/',
    icon: 'Home'
  },
  {
    id: '2',
    title: 'Users',
    expandable: true,
    icon: 'Users',
    permissions: 'users.list',
    link: '/users',
    children: [
      {
        id: '2.1',
        title: 'All Users',
        expandable: false,
        link: '/users'
      },
      {
        id: '2.2',
        title: 'Add User',
        expandable: false,
        link: '/users/add'
      }
    ]
  },
  {
    id: '3',
    title: 'Settings',
    expandable: true,
    icon: 'Cog',
    children: [
      {
        id: '3.1',
        title: 'General',
        expandable: false,
        link: '/settings/general'
      },
      {
        id: '3.2',
        title: 'Security',
        expandable: false,
        link: '/settings/security'
      }
    ]
  }
]
const auth = useAuthStore()
// auth.hasPermission(permission)
</script>
<template>
  <div
    :class="{ 'w-64': sidebarOpen, 'w-20': !sidebarOpen }"
    class="h-screen border-r border-gray-200 bg-white flex transition-width duration-150 ease-in-out flex flex-col divide-y divide-gray-200"
  >
    <!-- Header -->
    <div class="flex space-x-4 justify-center p-4 h-20">
      <IconLogo :class="{ 'h-10 w-10': sidebarOpen, 'h-6 w-6': !sidebarOpen }" />

      <span
        v-if="itemsShown"
        class="transition-all text-4xl text-gray-600 overflow-hidden font-montserrat"
        >Portal</span
      >
    </div>
    <!-- Header -->

    <!-- Menu Items -->
    <div class="flex flex-col flex-1 bg-white overflow-y-auto p-4" :class="{'items-center': !sidebarOpen}">
      <a :href="item.link" v-for="(item, index) in menu" :key="'item-' + index" class="flex space-x-2 py-2 text-gray-500 hover:text-gray-700">
        <component :is="getIconComponent(item.icon)" class="transition-all duration-300" :class="sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'" />
        <div v-if="itemsShown" class="flex-1 text-md">{{ item.title }}</div>
      </a>
    </div>
    <!-- Menu Items -->

    <!-- Sidebar Toggle -->
    <button
      :class="{ 'justify-end': sidebarOpen, 'justify-center': !sidebarOpen }"
      class="flex p-4"
      @click="toggleSidebar"
    >
      <IconChevronLeft :class="{ 'rotate-180': !sidebarOpen }" class="transition-all" />
    </button>
    <!-- Sidebar Toggle -->
  </div>
</template>
