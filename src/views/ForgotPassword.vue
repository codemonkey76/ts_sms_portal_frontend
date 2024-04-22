<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation.ts'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import NavLink from '@/components/NavLink.vue'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '@/components/Frame.vue'
const router = useRouter()
const { errors, setErrors } = useValidation()


const handleReset = () => {
  axios
    .post('/auth/request-password-reset', form)
    .then((response) => {
      sent.value = true
      email_sent.value = form.email
      form.email = ''
    })
    .catch((error) => {
      console.log(error)
      if (error.response.status === 422) {
        setErrors(error.response.data.errors)
      }
      console.log(error)
    })
}

const sent = ref(false)
const email_sent = ref('')

const form = reactive({
  email: '',
  redirect_path: import.meta.env.VITE_BASE_URL + '/reset-password'
})

</script>
<template>
  <frame>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <icon-logo class="mx-auto h-24 w-auto" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-300 text-gray-900">
          Reset password
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

        <form class="space-y-6" @submit.prevent="handleReset" action="#" method="POST">

          <text-input name="email" v-model="form.email" label="Email address" :has-error="errors.has('email')"
            :error="errors.first('email')" type="email" required="" />



          <div class="flex items-center justify-center">
            <nav-link to="/login" class="text-sm mx-4">I remember my password</nav-link>
          </div>

          <div>
            <button-primary v-if="!sent" class="w-full">
              Send Reset Link
            </button-primary>
            <p v-else class="w-[300px] text-green-500 text-sm font-semibold mx-auto text-center">Email has been sent to
              <span v-text="email_sent" />, click the link provided in the email to reset your password.
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
