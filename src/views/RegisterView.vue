<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useValidation from '@/composables/useValidation.ts'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
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
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Create a new account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-4" @submit.prevent="handleLogin" action="#" method="POST">
          <div>
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                v-model="form.name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('name')" class="text-red-500 text-xs mt-1">
                {{ errors.first('name') }}
              </p>
            </div>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="form.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('email')" class="text-red-500 text-xs mt-1">
                {{ errors.first('email') }}
              </p>
            </div>
          </div>

          <div>
            <label for="invite_code" class="block text-sm font-medium leading-6 text-gray-900"
              >Invite Code</label
            >
            <div class="mt-1">
              <input
                id="invite_code"
                name="invite_code"
                type="text"
                required
                v-model="form.invite_code"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('invite_code')" class="text-red-500 text-xs mt-1">
                {{ errors.first('invite_code') }}
              </p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                v-model="form.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('password')" class="text-red-500 text-xs mt-1">
                {{ errors.first('password') }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="password_confirmation"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Confirm Password</label
            >
            <div class="mt-2">
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                required="true"
                v-model="form.password_confirmation"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p v-if="errors.has('password_confirmation')" class="text-red-500 text-xs mt-1">
                {{ errors.first('password_confirmation') }}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        {{ ' ' }}
        <router-link
          to="/login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Login</router-link
        >
      </p>
    </div>
  </div>
</template>
