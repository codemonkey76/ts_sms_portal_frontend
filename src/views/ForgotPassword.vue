<script setup lang="ts">
import Frame from '@/components/Frame.vue'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'
import { ref, reactive } from 'vue'
import axios from 'axios'

const sent = ref(false)
const form = reactive({
  email: ''
})
const sendResetLink = () => {
  axios
    .post('/forgot-password', form)
    .then(() => {
      sent.value = true
    })
    .catch((e) => {
      console.error('Failed to send email')
      console.error(e)
      sent.value = false
    })
}
</script>
<template>
  <frame>
    <div class="h-16 w-16 bg-sky-600 rounded-full flex items-center justify-center">
      <envelope-icon class="w-10 h-10 text-sky-300 mx-auto" />
    </div>
    <h1 class="font-semibold text-gray-900 text-2xl">Forgot your password?</h1>
    <p>
      Remember your password?<a
        href="/login"
        class="text-sky-600/80 hover:underline font-semibold pl-2"
        >Login here</a
      >
    </p>
    <form @submit.prevent="sendResetLink" class="flex flex-col items-center">
      <div
        class="bg-white w-64 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
      >
        <label for="email" class="block text-xs font-medium text-gray-900">Email address</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="form.email"
          required
          class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="user@example.com"
        />
      </div>
      <button
        @click="resend"
        v-if="!sent"
        class="mt-2 px-4 py-2 rounded-md shadow border bg-sky-600 hover:bg-sky-700 text-white font-semibold"
      >
        Send Password Reset Link
      </button>
      <p v-else class="text-sm font-semibold text-green-600">
        Email sent successfully. Please check your inbox.
      </p>
    </form>

    <p class="text-center">
      Click on the link to view the password reset form.<br />You might need to check your spam
      folder.
    </p>
    <p class="text-sm text-gray-500">
      You can reach us at
      <a href="mailto:support@alphasg.com.au" class="text-sky-600/80 hover:underline font-semibold"
        >support@alphasg.com.au</a
      >
      if you require assistance.
    </p>
  </frame>
</template>
