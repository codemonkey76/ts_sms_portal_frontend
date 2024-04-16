<script setup lang="ts">
</script>
<template>
  <button
    class="px-4 py-2 rounded-md shadow border bg-gray-600 hover:bg-gray-700 text-white font-semibold disabled:cursor-not-allowed disabled:bg-opacity-50"
    v-bind="$attrs">
    <slot></slot>
  </button>
</template>
