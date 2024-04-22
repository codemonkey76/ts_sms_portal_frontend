<script lang="ts" setup>
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import Frame from '@/components/Frame.vue'

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
  <frame>
      <icon-logo class="mx-auto h-24 w-auto" />
      <h1 class="font-semibold dark:text-gray-300 text-gray-900 text-2xl">Verify your email address</h1>
      <p class="dark:text-gray-300">We have sent a verification link to <strong v-text="userEmail"></strong></p>
      <p class="text-center dark:text-gray-300">
        Click on the link to complete the verification process.<br />You might need to check your
        spam folder.
      </p>
      <button-primary v-if="!sent" @click="resend">Resend Email</button-primary>
      <p v-else class="text-sm font-semibold text-green-600">
        Email sent successfully. Please check your inbox.
      </p>
      <p class="text-sm dark:text-gray-400 text-gray-500">
        You can reach us at
        <a
          class="text-primary-600/80 hover:underline font-semibold"
          href="mailto:support@alphasg.com.au"
          >support@alphasg.com.au</a
        >
        if you require assistance.
      </p>
  </frame>
</template>
