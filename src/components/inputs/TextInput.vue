<script lang="ts" setup>
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
    <label :for="name" class="block text-sm font-medium leading-6 dark:text-gray-500 text-gray-900" v-text="label" />
    <div class="relative mt-1 rounded-md shadow-sm bg-white/5">
      <input :id="name" v-model="model" :aria-describedby="name + '-error'"
         :aria-invalid="hasError"
        :class="{
          'pr-10 dark:text-red-500 text-red-900 dark:ring-red-600/50 ring-red-300 dark:placeholder-red-600/50 placeholder:text-red-300/50 focus:ring-red-500': hasError,
          'dark:text-white text-gray-900 dark:ring-gray-600 ring-gray-300 placeholder:text-gray-600 focus:ring-primary-600': !hasError
        }"
        :name="name" :placeholder="placeholder" :type="type" class="block w-full rounded-md bg-white/5 border-0 py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" >

      <div v-if="hasError" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon aria-hidden="true" class="h-5 w-5 text-red-500" />
      </div>
    </div>
    <p v-if="hasError" :id="name + 'error'" class="mt-0.5 text-sm text-red-600" v-text="error" />
  </div>
</template>
