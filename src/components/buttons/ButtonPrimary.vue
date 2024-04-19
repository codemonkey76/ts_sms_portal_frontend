<script lang="ts" setup>
</script>
<template>
  <button
    class="px-4 py-2 rounded-md shadow border border-white dark:border-white/50 bg-primary-600 hover:bg-primary-700 text-white font-semibold disabled:cursor-not-allowed disabled:bg-opacity-50"
    v-bind="$attrs">
    <slot></slot>
  </button>
</template>
