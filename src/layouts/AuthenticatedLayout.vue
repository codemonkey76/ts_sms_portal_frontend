<script setup lang="ts">
import DesktopSidebar from '@/components/DesktopSidebar.vue'
import Sidebar from '@/components/Sidebar.vue'
import HeaderBar from '@/components/HeaderBar.vue'
import { reactive } from 'vue'
import { MenuItem } from '@/types/Menu'

const menu = reactive<MenuItem>({
  name: "Root",
  children: [
    { name: "Dashboard" },
    { name: "SMS" },
    { name: "Contacts" },
    {
      name: "Bulk Messaging",
      children: [
        { name: "Campaigns" },
        {
          name: "Templates",
          children: [
            { name: "Create" },
            { name: "Edit" },
          ]
        },
        { name: "Reports" },
      ]
    },
    { name: "Users" },
    { name: "Settings" },
  ],
});
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
