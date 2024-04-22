<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation'
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import TextInput from '@/components/inputs/TextInput.vue'
import IconLogo from '@/components/icons/IconLogo.vue'
import NavLink from '@/components/NavLink.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Frame from '@/components/Frame.vue'
const router = useRouter()
const { errors, setErrors } = useValidation()

const remember_me = ref(false)

const handleLogin = () => {
  axios
    .post('/auth/login', form)
    .then((response) => {
      useAuthStore().login(response.data.data)
      if (remember_me.value) {
        localStorage.setItem('userEmail', form.email)
      } else {
        localStorage.removeItem('userEmail')
      }
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
  email: '',
  password: ''
})

onMounted(() => {
  if (localStorage.getItem('userEmail')) {
    form.email = localStorage.getItem('userEmail') || ''
    remember_me.value = true
  }
})
</script>
<template>
  <frame>
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <icon-logo class="mx-auto h-24 w-auto" />
        <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight dark:text-gray-300 text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

        <form class="space-y-6" @submit.prevent="handleLogin" action="#" method="POST">

          <text-input name="email" v-model="form.email" label="Email address" :has-error="errors.has('email')"
            :error="errors.first('email')" type="email" required="" autocomplete="email" placeholder="user@email.com" />

          <text-input name="password" v-model="form.password" label="Password" :has-error="errors.has('password')"
            :error="errors.first('password')" type="password" required="" autocomplete="current-password" />


          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input v-model="remember_me" id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
              <label for="remember-me" class="ml-3 block text-sm leading-6 dark:text-gray-300 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm leading-6">
              <nav-link to="forgot-password">Forgot
                password?</nav-link>
            </div>
          </div>

          <div>
            <button-primary class="w-full">
              Sign in
            </button-primary>
          </div>
        </form>

        <p class=" mt-10 text-center text-sm text-gray-500">
          Not a member?
          {{ ' ' }}
          <nav-link to="/register">Register</nav-link>
        </p>
      </div>
    </div>
  </frame>
</template>
