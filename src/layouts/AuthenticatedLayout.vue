<script setup lang="ts">
import DesktopSidebar from '@/components/DesktopSidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
</script>
<template>
  <div class="flex bg-white h-screen">
    <!-- <Sidebar /> -->
    <desktop-sidebar />
    <div class="h-screen flex-1">
      <header-bar />
      <div class="border-2 border-red-400">
        <RouterView />
      </div>
    </div>
  </div>
</template>
