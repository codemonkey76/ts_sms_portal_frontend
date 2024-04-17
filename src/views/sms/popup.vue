<script setup lang="ts">
import { CalendarIcon, ClockIcon } from '@heroicons/vue/24/solid'
</script>
<template>
  <div class="absolute">
    <div class="flex flex-col">
      <div class="bg-sky-600 text-white px-4 py-2 rounded-md">
        <div class="text-xs uppercase tracking-wide">Select date</div>
        <div class="text-2xl font-semibold py-2 px-4">Thu, Apr 18</div>
        <div class="flex justify-between">
          <button class="px-10 py-2 hover:bg-sky-700 rounded-lg"><calendar-icon class="h-5 w-5" /></button>
          <button class="px-10 py-2 hover:bg-sky-700 rounded-lg"><clock-icon class="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  </div>
</template>
