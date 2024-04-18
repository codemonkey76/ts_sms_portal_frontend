<script lang="ts" setup>
import DateTimePickerModal from '@/components/inputs/DateTimePickerModal.vue'
import { CalendarDaysIcon } from '@heroicons/vue/24/solid'
import { computed, ref } from 'vue'

const isModalOpen = ref(false)

const handleClose = () => {
  isModalOpen.value = false
}

const openModal = () => {
  isModalOpen.value = true
}

const dateTimeString = computed(() => {
  return model.value ? formatDate(model.value) : ''
})

const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
  const year = date.getFullYear()
  let numHours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = numHours >= 12 ? 'PM' : 'AM'
  numHours = numHours % 12
  const hours = numHours ? numHours.toString().padStart(2, '0') : '12' // the hour '0' should be '12'

  return `${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`
}

const model = defineModel<Date>()
</script>
<template>
  <div class="relative">
    <input
      :value="dateTimeString"
      class="block w-full rounded-md border-0 py-1.5 pr-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      placeholder="Select date/time"
      type="text"
      @click="openModal"
    />
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <calendar-days-icon class="h-5 w-5 text-gray-400" />
    </div>
    <date-time-picker-modal v-model="model" :show="isModalOpen" @close="handleClose" />
  </div>
</template>
