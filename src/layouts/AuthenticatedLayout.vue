<script setup lang="ts">
import DesktopSidebar from '@/components/DesktopSidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
</script>
<template>
  <div class="flex bg-white h-screen">
    <!-- Sidebar -->
    <desktop-sidebar />
    <!-- Sidebar  -->


    <!-- Main -->
    <div class="flex flex-1 flex-col">
      <header-bar />
      <div class="flex-1 overflow-y-auto">
        <RouterView />
      </div>
    </div>
    <!-- Main -->
  </div>
</template>
