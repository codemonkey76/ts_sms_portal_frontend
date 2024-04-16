<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation.ts'
import axios from 'axios'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import NavLink from '@/components/NavLink.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import Frame from '@/components/Frame.vue'

const router = useRouter()
const { errors, setErrors } = useValidation()

const handleLogin = () => {
  axios
    .post('/auth/register', form)
    .then((response) => {
      console.log('Response', response)
      console.log('Response.Data', response.data)
      console.log('Response.Data.Data', response.data.data)
      useAuthStore().login(response.data.data)
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
  name: '',
  email: '',
  invite_code: '',
  password: '',
  password_confirmation: '',
  redirect_path: import.meta.env.VITE_BASE_URL + '/'
})
</script>
<template>
  <frame>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <icon-logo class="h-24 w-auto mx-auto" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <form class="space-y-4" @submit.prevent="handleLogin" action="#" method="POST">
          <text-input name="name" v-model="form.email" label="Name" :has-error="errors.has('name')"
            :error="errors.first('name')" type="text" required="" autocomplete="name" />

          <text-input name="email" v-model="form.email" label="Email address" :has-error="errors.has('email')"
            :error="errors.first('email')" type="email" required="" autocomplete="email" />

          <text-input name="invite_code" v-model="form.invite_code" label="Invite code"
            :has-error="errors.has('invite_code')" :error="errors.first('invite_code')" type="text" required="" />

          <text-input name="password" v-model="form.password" label="Password" :has-error="errors.has('password')"
            :error="errors.first('password')" type="password" required="" />

          <text-input name="password_confirmation" v-model="form.password" label="Confirm password"
            :has-error="errors.has('password_confirmation')" :error="errors.first('password_confirmation')"
            type="password" required="" />

          <div>
            <button-primary class="w-full">
              Create account
            </button-primary>
          </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
          Already have an account?
          {{ ' ' }}
          <nav-link to="/login">Login</nav-link>
        </p>
      </div>
    </div>
  </frame>
</template>
