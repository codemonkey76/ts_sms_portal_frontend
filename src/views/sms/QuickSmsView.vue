<script lang="ts" setup>
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
import DateTimePicker from '@/components/inputs/DateTimePicker.vue'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { reactive, ref } from 'vue'


type QuickSmsForm = {
  recipient: string
  sender_id: string
  message: string
  scheduled: 'now' | 'later'
  scheduled_time: Date | undefined
}

const form = reactive<QuickSmsForm>({
  recipient: '',
  sender_id: '',
  message: '',
  schedule: 'now',
  scheduled_time: undefined
})

const selectedDate = ref<Date | undefined>()

const sendSms = () => {
  axios
    .post('/sms/quick', form)
    .then((response) => {
      // display some success notification.
    })
    .catch((error) => {
      // display some error notification.
    })
  console.log(form)
}
</script>
<template>
  <div class="dark:bg-gray-900 bg-gray-100 p-8 h-full">
    <div
      class="max-w-2xl dark:bg-gray-800 bg-white rounded-lg shadow-lg border border-gray-300 dark:border-primary-600 p-4 space-y-4">
      <h2 class="text-2xl font-semibold text-primary-600 font-monserrat pb-2 dark:border-gray-600 border-b">Quick SMS
      </h2>
      <form class="space-y-4" @submit.prevent="sendSms">
        <div class="grid grid-cols-8 items-baseline">
          <label class="text-gray-500 text-sm" for="to">To</label>
          <input id="to" v-model="form.recipient"
            class="col-span-7 block w-full rounded-md bg-white/5 border-0 py-1.5 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            name="to" placeholder="Enter recipient mobile number" required type="text" />
        </div>
        <div class="grid grid-cols-8 items-baseline">
          <label class="text-gray-500 text-sm" for="from">From</label>
          <input id="from" v-model="form.sender_id"
            class="col-span-7 block w-full rounded-md bg-white/5 border-0 py-1.5 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            name="from" placeholder="Enter Sender ID / mobile number" required type="text" />
        </div>
        <div class="grid grid-cols-8 items-baseline">
          <label class="text-gray-500 text-sm" for="message">Message</label>
          <textarea id="message" v-model="form.message"
            class="col-span-7 block w-full rounded-md bg-white/5 border-0 py-1.5 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/10 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            name="message" placeholder="Enter message" required rows="5" type="text"></textarea>
        </div>
        <div class="grid grid-cols-8 items-baseline">
          <label class="text-gray-500 text-sm" for="send-now">Send Time</label>
          <div class="col-span-7 flex items-center space-x-2">
            <label
              class="flex border border-gray-300 dark:border-white/10 rounded-md bg-white/5 items-center space-x-2 px-4 py-2 has-[:checked]:dark:bg-gray-800/50 has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600"
              for="send-now">
              <input id="send-now" v-model="form.schedule" class="h-4 w-4 text-primary-600 focus:ring-primary-600"
                name="push-notifications" type="radio" value="now" />
              <span class="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900">Now</span>
            </label>
            <label
              class="flex border border-gray-300 dark:border-white/10 rounded-md bg-white/5 items-center space-x-2 px-4 py-2 has-[:checked]:dark:bg-gray-800/50 has-[:checked]:bg-primary-50 has-[:checked]:border-primary-600"
              for="send-later">
              <input id="send-later" v-model="form.schedule" class="h-4 w-4 text-primary-600 focus:ring-primary-600"
                name="push-notifications" type="radio" value="later" />
              <span class="block text-sm font-medium leading-6 dark:text-gray-300 text-gray-900">Later</span>
            </label>
            <date-time-picker v-if="form.schedule === 'later'" v-model="selectedDate" />
          </div>
        </div>
        <div class="flex justify-end">
          <button-primary>Send</button-primary>
        </div>
      </form>
    </div>
  </div>
</template>
