<script lang="ts" setup>

import { XCircleIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'
import IconLogo from '@/components/icons/IconLogo.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
const route = useRoute();
const error = ref<string|null>('');
const store = useAuthStore();

watch(() => store.error, (newError) => {
  if (newError) {
    error.value = newError;
  } else {
    router.replace({ name: 'home' });
  }
}, { immediate: true });
</script>

<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
    <div class="absolute inset-0 bg-center"></div>
    <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div class="mx-auto max-w-md">
        <div class="flex space-x-2">
          <icon-logo class="h-12 w-12" />
          <span class="transition-all text-4xl text-gray-600 overflow-hidden font-montserrat">Portal</span>
        </div>
        <div v-if="error" class="divide-y divide-gray-300/50">
          <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
            <div class="flex space-x-2">
              <x-circle-icon class="h-8 w-8 flex-none fill-red-100 stroke-red-500 stroke-1" />
              <p>A critical error has occurred in the application:</p>
            </div>
            <p v-html="error" />
          </div>
          <div class="pt-8 text-base font-semibold leading-7">
            <p class="text-gray-900">If you see this error message, please report it</p>
            <p>
              <a class="text-primary-500 hover:text-primary-600" href="mailto:support@alphasg.com.au">Email Support</a>
            </p>
          </div>
        </div>
        <div v-else class="divide-y divide-gray-300/50">
          <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
            Nothing to see here
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>