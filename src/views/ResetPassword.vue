<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation.ts'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import NavLink from '@/components/NavLink.vue'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Frame from '@/components/Frame.vue'
const router = useRouter()
const { errors, setErrors } = useValidation()


const handleReset = () => {
  axios
    .post('/auth/reset-password', form)
    .then((response) => {
      router.push({ name: 'home' })
    })
    .catch((error) => {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
      console.log(error)
    })
}

const form = reactive({
  password: '',
  password_confirmation: '',
  token: useRoute().query.token || ''
})

</script>
<template>
  <frame>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <icon-logo class="mx-auto h-24 w-auto" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-300 text-gray-900">
          Reset your password
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

        <form class="space-y-6" @submit.prevent="handleReset" action="#" method="POST">

          <text-input name="password" v-model="form.password" label="New password" :has-error="errors.has('password')"
            :error="errors.first('password')" type="password" required="" />

          <text-input name="password_confirmation" v-model="form.password_confirmation" label="Confirm password"
            :has-error="errors.has('password_confirmation')" :error="errors.first('password_confirmation')"
            type="password" required="" />


          <div class="flex items-center justify-center">
            <nav-link to="/login" class="text-sm mx-4">I remember my password</nav-link>
          </div>

          <div>
            <button-primary class="w-full" :disabled="!form.token">
              Reset Password
            </button-primary>
            <p v-if="!form.token" class="text-sm text-red-500 mt-2">You can't submit this form without a reset
              token
            </p>

          </div>
        </form>

        <p class="flex flex-col mt-10 text-center text-sm text-gray-500">
          Require assistance?
          {{ ' ' }}
          <nav-link href="mailto:support@alphasg.com.au">support@alphasg.com.au</nav-link>
        </p>
      </div>
    </div>
  </frame>
</template>
