<script setup lang="ts">
import DesktopSidebar from '@/components/DesktopSidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
</script>
<template>
  <div class="flex bg-white h-screen">
    <!-- <Sidebar /> -->
    <desktop-sidebar />
    <div class="flex-1 flex flex-col">
    <header-bar />
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>
