<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { ref, reactive} from 'vue'
import { useRouter } from 'vue-router'
import IconChevronLeft from './icons/IconChevronLeft.vue'
import IconLogo from './icons/IconLogo.vue'
import * as HeroIcons from '@heroicons/vue/24/solid'
import { menu } from '@/menu/menu'
const router = useRouter()
const getIconComponent = (iconName: string | undefined) => {
  if (!iconName) return null
  return HeroIcons[iconName + "Icon"]
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

const auth = useAuthStore()


const hidePopup = (item) => {
  item.showPopup = false
}

const hidePopupsNow = () => {
  menu.forEach(m => {
    m.showPopup = false
  })
}

const selectItem = (item: MenuItem) => {
  if (item.expandable) {
    item.isOpen = !item.isOpen
    if (item.isOpen) {
      menu.forEach(m => {
        if (m.id !== item.id && m.expandable) {
          m.isOpen = false
        }
      })
    }
  } else {
    router.push({ path: item.link })
  }
}

const hasPermission = (permissions: string | string[] | undefined): boolean => {
  return auth.can(permissions)
}
const liRefs = reactive({})

function setLiRef(index) {
  return el => {
    if (el) {
      liRefs[index] = el
    }
  }
}

const sidebar = ref(null)

const showPopup = (index, item) => {
  hidePopupsNow()
  if (!item.children || sidebarOpen) return
  const li = liRefs[index]

  item.showPopup = true;
  const rect = li.getBoundingClientRect()
  item.popupStyle = { top: `${rect.top}px`, left: `${rect.right + 30}px` }
}

</script>
<template>
  <div ref="sidebar" :class="{ 'w-64': sidebarOpen, 'w-20': !sidebarOpen }"
    class="h-screen border-r border-gray-200 bg-white transition-width duration-150 ease-in-out flex flex-col divide-y divide-gray-200 relative">
    <!-- Header -->
    <div class="flex space-x-4 justify-center p-4 h-20">
      <IconLogo :class="{ 'h-10 w-10': sidebarOpen, 'h-6 w-6': !sidebarOpen }" />

      <span v-if="itemsShown"
        class="transition-all text-4xl text-gray-600 overflow-hidden font-montserrat">Portal</span>
    </div>
    <!-- Header -->

    <ul :class="{ 'items-center': !sidebarOpen }" class="flex flex-col flex-1 bg-white overflow-y-auto p-4">
      <template v-for="(item, index) in menu">
        <li v-if="hasPermission(item.permissions)" :key="item.id" :ref="setLiRef(index)"
          @mouseenter="showPopup(index, item)">
          <a :href="item.link || '#'" class="flex items-center space-x-2 py-2 text-gray-500 hover:text-gray-700"
            @click.prevent="selectItem(item)">
            <component :is="getIconComponent(item.icon)" :class="sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'"
              class="transition-all duration-300" />
            <div v-if="itemsShown" class="flex-1 text-md">{{ item.title }}</div>
            <component :is="getIconComponent('ChevronDown')" v-if="item.expandable && sidebarOpen"
              :class="{ 'rotate-180': item.isOpen }" class="h-5 w-5 transition-all" />
          </a>
          <ul v-if="item.showPopup" :style="item.popupStyle" class="absolute left-0 top-0 border shadow p-2 y-2 w-[200px]"
            @mouseleave="hidePopup(item)">
            <li v-for="(child, index) in item.children" :key="'popup-child-' + index"
              class="text-gray-500 hover:text-gray-700">
              <a :href="child.link || '#'" class="py-2" @click.prevent="selectItem(child)">{{ child.title }}</a>
            </li>
          </ul>
          <ul v-if="item.children && sidebarOpen" :class="{ 'max-h-0': !item.isOpen, 'max-h-96': item.isOpen }"
            class="pl-4 transition-all duration-300 overflow-hidden" @onmouseleave="hidePopup(item)">
            <li v-for="(child, index) in item.children" :key="'child-' + index"
              class="text-gray-500 hover:text-gray-700">
              <a :href="child.link || '#'" class="py-1" @click.prevent="selectItem(child)">{{ child.title }}</a>
            </li>
          </ul>
        </li>
      </template>
    </ul>

    <!-- Sidebar Toggle -->
    <button :class="{ 'justify-end': sidebarOpen, 'justify-center': !sidebarOpen }" class="flex p-4"
      @click="toggleSidebar">
      <IconChevronLeft :class="{ 'rotate-180': !sidebarOpen }" class="transition-all" />
    </button>
    <!-- Sidebar Toggle -->
  </div>
</template>
