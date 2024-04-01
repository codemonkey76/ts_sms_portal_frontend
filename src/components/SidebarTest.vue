<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
<template>
  <div
    class="bg-blue-400 transition-width ease-in-out duration-500"
    :class="{ 'w-64': open, 'w-18': !open }"
  >
    <button @click="open = !open">Toggle</button>
  </div>
</template>
