<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation.ts'
import axios from 'axios'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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
    form.email = localStorage.getItem('userEmail')
    remember_me.value = true
  }
})
</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" @submit.prevent="handleLogin" action="#" method="POST">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                v-model="form.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('email')" class="text-red-500 text-xs mt-1">
                {{ errors.first('email') }}
              </p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                v-model="form.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('password')" class="text-red-500 text-xs mt-1">
                {{ errors.first('password') }}
              </p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                v-model="remember_me"
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900"
                >Remember me</label
              >
            </div>

            <div class="text-sm leading-6">
              <a href="/forgot-password" class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Forgot password?</a
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <router-link
          to="/register"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Register</router-link
        >
      </p>
    </div>
  </div>
</template>
