<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const sent = ref(false)

const resend = () => {
  const form = {
    redirect_path: import.meta.env.VITE_BASE_URL + '/'
  }
  axios
    .post('/request-verification', form)
    .then(() => {
      sent.value = true
    })
    .catch((e) => {
      console.error('Failed to send email')
      console.error(e)
      sent.value = false
    })
}
const authStore = useAuthStore()
const userEmail = authStore.user_data?.user?.email
</script>
<template>
  <div class="bg-gray-900 h-screen flex items-center">
    <div
      class="max-w-4xl mx-auto px-6 py-8 border shadow-lg rounded-lg bg-gray-100 flex flex-col items-center justify-center space-y-4"
    >
      <div class="h-16 w-16 bg-sky-600 rounded-full flex items-center justify-center">
        <envelope-icon class="w-10 h-10 text-sky-300 mx-auto" />
      </div>
      <h1 class="font-semibold text-gray-900 text-2xl">Verify your email address</h1>
      <p>We have sent a verification link to <strong v-text="userEmail"></strong></p>
      <p class="text-center">
        Click on the link to complete the verification process.<br />You might need to check your
        spam folder.
      </p>
      <button
        @click="resend"
        v-if="!sent"
        class="px-4 py-2 rounded-md shadow border bg-sky-600 hover:bg-sky-700 text-white font-semibold"
      >
        Resend Email
      </button>
      <p v-else class="text-sm font-semibold text-green-600">
        Email sent successfully. Please check your inbox.
      </p>
      <p class="text-sm text-gray-500">
        You can reach us at
        <a
          href="mailto:support@alphasg.com.au"
          class="text-sky-600/80 hover:underline font-semibold"
          >support@alphasg.com.au</a
        >
        if you require assistance.
      </p>
    </div>
  </div>
</template>
