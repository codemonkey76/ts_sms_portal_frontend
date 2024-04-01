<script setup lang="ts">
import { ref } from 'vue'
import IconChevronLeft from './icons/IconChevronLeft.vue'
import IconChevronRight from './icons/IconChevronRight.vue'
import IconLogo from './icons/IconLogo.vue'

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
</script>
<template>
  <div
    class="border-r border-gray-200 bg-white flex transition-width duration-150 ease-in-out flex flex-col divide-y divide-gray-200"
    :class="{ 'w-64': sidebarOpen, 'w-20': !sidebarOpen }"
  >
    <!-- Header -->
    <div class="flex space-x-4 justify-center p-4">
      <IconLogo :class="{ 'h-10 w-10': sidebarOpen, 'h-6 w-6': !sidebarOpen }" />

      <span
        v-if="itemsShown"
        class="transition-all text-4xl text-gray-600 tracking-wide overflow-hidden"
        >Portal</span
      >
    </div>
    <!-- Header -->

    <!-- Menu Items -->
    <div class="flex flex-col flex-1 bg-white overflow-y-scroll">
      <div v-for="x in [...Array(100).keys()]" class="flex space-x-2">
        <div>Icon</div>
        <div v-if="itemsShown">Item Description</div>
      </div>
    </div>
    <!-- Menu Items -->

    <!-- Sidebar Toggle -->
    <button
      @click="toggleSidebar"
      class="flex p-4"
      :class="{ 'justify-end': sidebarOpen, 'justify-center': !sidebarOpen }"
    >
      <IconChevronLeft class="transition-all" :class="{ 'rotate-180': !sidebarOpen }" />
    </button>
    <!-- Sidebar Toggle -->
  </div>
</template>
