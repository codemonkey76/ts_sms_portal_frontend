<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
defineProps({
  label: String,
  name: String,
  type: {
    type: String,
    default: 'text'
  },
  error: String,
  hasError: Boolean,
  placeholder: String,
})

const model = defineModel();
</script>
<template>
  <div>
    <label :for="name" class="block text-sm font-medium leading-6 text-gray-900" v-text="label" />
    <div class="relative mt-1 rounded-md shadow-sm">
      <input :type="type" :name="name" :id="name"
        class="block w-full rounded-md border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        :class="{
          'pr-10 text-red-900 ring-1 ring-red-300 placeholder:text-red-300 focus:ring-red-500': hasError,
          'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-sky-600': !hasError
        }" :placeholder="placeholder" v-model="model" aria-invalid="true" :aria-describedby="name + 'error'">

      <div v-if="hasError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p v-if="hasError" class="mt-0.5 text-sm text-red-600" :id="name + 'error'" v-text="error" />
  </div>
</template>
