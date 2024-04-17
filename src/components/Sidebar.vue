<script setup lang="ts">
import { reactive } from 'vue';
import { MenuItem } from '@/types/Menu';

const { children } = defineProps<{
  level: number;
  children?: MenuItem[];
}>();

</script>
<template>
  <div :class="{ 'w-64': sidebarOpen, 'w-20': !sidebarOpen }"
    class="h-screen border-r border-gray-200 bg-white transition-width duration-150 ease-in-out flex flex-col divide-y divide-gray-200">
    <!-- Header -->
    <div class="flex space-x-4 justify-center p-4 h-20">
      <IconLogo :class="{ 'h-10 w-10': sidebarOpen, 'h-6 w-6': !sidebarOpen }" />

      <span v-if="itemsShown"
        class="transition-all text-4xl text-gray-600 overflow-hidden font-montserrat">Portal</span>
    </div>
    <ul>
      <li v-for="(item, index) in children" :key="index">
        {{ item.name }}
        <sidebar v-if="item.children" :children="item.children" :level="level + 1" />
      </li>
    </ul>
  </div>
</template>
