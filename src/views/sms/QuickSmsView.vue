<script setup lang="ts">
import ButtonPrimary from '@/components/buttons/ButtonPrimary.vue'
</script>
<template>
  <div class="bg-gray-100 p-8 h-full">
    <div class="max-w-2xl bg-white rounded-lg shadow-lg border p-4 space-y-4">
      <h2 class="text-2xl font-semibold text-sky-600 font-monserrat pb-2 border-b">Quick SMS</h2>
      <div class="grid grid-cols-8 items-baseline">
        <label for="to" class="text-gray-500 text-sm">To</label>
        <input type="text" name="to" id="to"
          class="col-span-7 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Enter recipient mobile number" />
      </div>
      <div class="grid grid-cols-8 items-baseline">
        <label for="from" class="text-gray-500 text-sm">From</label>
        <input type="text" name="from" id="from"
          class="col-span-7 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Enter Sender ID / mobile number" />
      </div>
      <div class="grid grid-cols-8 items-baseline">
        <label for="message" class="text-gray-500 text-sm">Message</label>
        <textarea type="text" name="message" id="message" rows=5
          class="col-span-7 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          placeholder="Enter message"></textarea>
      </div>
      <div class="grid grid-cols-8 items-baseline">
        <label for="from" class="text-gray-500 text-sm">Send Time</label>
        <div class="col-span-7 flex items-center space-x-2">
          <label for="send-now"
            class="flex border rounded-md items-center space-x-2 px-4 py-2 has-[:checked]:bg-sky-50 has-[:checked]:border-sky-600">
            <input id="send-now" name="push-notifications" type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <span class="block text-sm font-medium leading-6 text-gray-900">Now</span>
          </label>
          <label for="send-later"
            class="flex border rounded-md items-center space-x-2 px-4 py-2 has-[:checked]:bg-sky-50 has-[:checked]:border-sky-600">
            <input id="send-later" name="push-notifications" type="radio"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <span class="block text-sm font-medium leading-6 text-gray-900">Later</span>
          </label>
        </div>
      </div>
      <div class="flex justify-end">
        <button-primary>Send</button-primary>
      </div>
    </div>
  </div>
</template>
