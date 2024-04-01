<script setup lang="ts">
import { ref } from 'vue'

const sidebarOpen = ref(false)
const itemsShown = ref(false)
const transitioning = ref(false)

const toggleSidebar = () => {
  if (!transitioning.value) {
    transitioning.value = true
    if (sidebarOpen.value) {
      itemsShown.value = false
      setTimeout(() => {
        sidebarOpen.value = false
        transitioning.value = false
      }, 500)
    } else {
      sidebarOpen.value = true
      setTimeout(() => {
        itemsShown.value = true
        transitioning.value = false
      }, 500)
    }
  }
}
</script>
<template>
  <div
    class="bg-gray-200 transition-width ease-in-out duration-500 flex"
    :class="{ 'w-64': sidebarOpen, 'w-18': !sidebarOpen }"
  >
    <div class="flex flex-col flex-1 p-1">
      <!-- Logo //-->
      <div class="flex space-x-4 justify-center p-4">
        <svg
          :class="{ 'h-12 w-12': sidebarOpen, 'h-8 w-8': !sidebarOpen }"
          class="text-gray-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M0 64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V416H64c-35.3 0-64-28.7-64-64V64zM96 180.8c0 12.3 6.2 23.8 16.4 30.7l29.4 19.6c1.3 .9 2.2 2.4 2.2 4c0 2.7-2.2 4.8-4.8 4.8H112c-8.8 0-16 7.2-16 16s7.2 16 16 16h27.2c20.3 0 36.8-16.5 36.8-36.8c0-12.3-6.2-23.8-16.4-30.7l-29.4-19.6c-1.3-.9-2.2-2.4-2.2-4c0-2.7 2.2-4.8 4.8-4.8H152c8.8 0 16-7.2 16-16s-7.2-16-16-16H132.8C112.5 144 96 160.5 96 180.8zM372.8 144c-20.3 0-36.8 16.5-36.8 36.8c0 12.3 6.2 23.8 16.4 30.7l29.4 19.6c1.3 .9 2.2 2.4 2.2 4c0 2.7-2.2 4.8-4.8 4.8H352c-8.8 0-16 7.2-16 16s7.2 16 16 16h27.2c20.3 0 36.8-16.5 36.8-36.8c0-12.3-6.2-23.8-16.4-30.7l-29.4-19.6c-1.3-.9-2.2-2.4-2.2-4c0-2.7 2.2-4.8 4.8-4.8H392c8.8 0 16-7.2 16-16s-7.2-16-16-16H372.8zm-152 6.4c-4.1-5.5-11.3-7.8-17.9-5.6S192 153.1 192 160v96c0 8.8 7.2 16 16 16s16-7.2 16-16V208l19.2 25.6c3 4 7.8 6.4 12.8 6.4s9.8-2.4 12.8-6.4L288 208v48c0 8.8 7.2 16 16 16s16-7.2 16-16V160c0-6.9-4.4-13-10.9-15.2s-13.7 .1-17.9 5.6L256 197.3l-35.2-46.9z"
          />
        </svg>
        <span v-if="sidebarOpen" class="text-4xl text-gray-600 tracking-wide">Portal</span>
      </div>
      <!-- Logo //-->

      <!-- Items //-->
      <div class="flex-1 border-y border-gray-600">
        <div
          class="transition-opacity duration-500"
          :class="{ 'opacity-0': !itemsShown, 'opacity-100': itemsShown }"
        >
          Item 1
        </div>
      </div>
      <!-- Items //-->

      <!-- Sidebar Toggle //-->
      <button
        @click="toggleSidebar"
        class="flex p-4"
        :class="{ 'justify-center': !sidebarOpen, 'justify-end': sidebarOpen }"
      >
        <svg
          v-if="sidebarOpen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          fill="currentColor"
          class="h-4 w-4 text-gray-600 transition transition-transform duration-500 transform"
          :class="{ 'rotate-180': sidebarOpen }"
          key="chevron-left"
        >
          <path
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
          />
        </svg>
        <svg
          v-else
          class="h-4 w-4 text-gray-600 transition transition-transform duration-500 transform"
          :class="{ 'rotate-180': sidebarOpen }"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
          key="chevron-right"
        >
          <path
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
          />
        </svg>
      </button>
      <!-- Sidebar Toggle //-->
    </div>
  </div>
</template>
