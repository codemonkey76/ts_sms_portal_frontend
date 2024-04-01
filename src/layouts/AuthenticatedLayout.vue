<script setup lang="ts">
import DesktopSidebar from '@/components/DesktopSidebar.vue'
</script>
<template>
  <div class="flex bg-white h-screen">
    <!-- <Sidebar /> -->
    <desktop-sidebar />
    <div class="flex-1 flex flex-col">
      <div class="bg-white">Header</div>
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>
