<script lang="ts" setup>
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from '@heroicons/vue/24/solid'
import { computed, onMounted, watch } from 'vue'
import * as picker from '@/composables/datePicker'
const { state, pageTitle, selectedDigit, setDigit, setAM, setPM } = picker;


const toggleState = () => {
  state.mode = state.mode === 'day' ? 'year' : 'day';
}

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}

const handleOK = () => {
  model.value = state.selected
  handleClose()
}

const model = defineModel<Date | undefined>()

const clearDate = () => {
  model.value = undefined
  handleClose()
}
watch(
  () => props.show,
  (show) => {
    if (show) {
      state.selected = model.value || new Date()
    }
  }
)

const formatMinutes = computed(() => {
  const mins = state.selected.getMinutes()
  return mins < 10 ? `0${mins}` : `${mins}`
})
onMounted(() => {
  picker.init()
})
</script>
<template>
  <div v-show="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay //-->
    <transition enter-active-class="ease-out duration-300" enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
      <div v-show="show" class="fixed inset-0 transform transition-all" @click="handleClose">
        <div class="absolute inset-0 bg-gray-800/50"></div>
      </div>
    </transition>
    <!-- Overlay //-->

    <!-- Dialog //-->
    <transition enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100" leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
      <div v-show="show" class="overflow-hidden bg-white rounded-lg shadow-xl transform transition-all w-[300px]">
        <div class="flex flex-col">
          <!-- Header //-->
          <div class="dark:bg-gray-700 bg-primary-600 text-white px-4 py-2 rounded-t-md">
            <!-- Date Header //-->
            <div v-if="state.mode === 'year' || state.mode === 'month' || state.mode === 'day'">
              <div class="text-xs uppercase tracking-wide">Select date</div>
              <div class="text-2xl font-semibold py-2 px-4" v-text="picker.formatDate(state.selected)" />
            </div>
            <!-- Date Header //-->

            <!-- Time Header //-->
            <div v-else class="flex items-center justify-center text-7xl sans space-x-1">
              <button :class="{ 'text-primary-200 dark:text-gray-400': state.mode === 'hour' }"
                class="hover:bg-primary-700 dark:hover:bg-gray-800/50 rounded-md p-1" @click="state.mode = 'hour'"
                v-text="state.selected.getHours() % 12 || 12" />
              <div>:</div>
              <button :class="{ 'text-primary-200 dark:text-gray-400': state.mode === 'minute' }"
                class="hover:bg-primary-700 dark:hover:bg-gray-800/50 rounded-md p-1" @click="state.mode = 'minute'"
                v-text="formatMinutes" />
              <div class="flex flex-col text-lg">
                <button :class="{ 'text-primary-200 dark:text-gray-400': state.selected.getHours() < 12 }"
                  class="hover:bg-primary-700 dark:hover:bg-gray-800/50 rounded-md p-1 uppercase"
                  @click="setAM">am</button>
                <button :class="{ 'text-primary-200 dark:text-gray-400': state.selected.getHours() >= 12 }"
                  class="hover:bg-primary-700 dark:hover:bg-gray-800/50 rounded-md p-1 uppercase"
                  @click="setPM">pm</button>
              </div>
            </div>
            <!-- Time Header //-->

            <div class="flex justify-between">
              <button class="px-10 py-2 dark:hover:bg-gray-800/50 hover:bg-primary-700 rounded-lg"
                @click="state.mode = 'day'">
                <calendar-icon class="h-5 w-5" />
              </button>
              <button class="px-10 py-2 dark:hover:bg-gray-800/50 hover:bg-primary-700 rounded-lg"
                @click="state.mode = 'hour'">
                <clock-icon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <!-- Header //-->

          <!-- Content //-->
          <div class="dark:bg-gray-600 dark:text-white bg-white rounded-b-md flex flex-col px-2">
            <!-- Controls //-->
            <div v-if="state.mode !== 'hour' && state.mode !== 'minute'"
              class="flex justify-between py-4 px-2 items-center">
              <button
                class="text-sm flex space-x-1 items-center font-semibold dark:text-gray-100 text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 px-2 py-2 rounded-md"
                @click="toggleState">
                <span>{{ pageTitle }}</span>
                <chevron-down-icon class="h-4 w-4 dark:text-white text-gray-600" />
              </button>
              <div class="space-x-6">
                <button class="dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full p-2 text-gray-600 dark:text-white"
                  @click="picker.prevPage">
                  <chevron-left-icon class="h-4 w-4" />
                </button>
                <button class="dark:hover:bg-gray-700 hover:bg-gray-200 rounded-full p-2 text-gray-600 dark:text-white"
                  @click="picker.nextPage">
                  <chevron-right-icon class="h-4 w-4" />
                </button>
              </div>
            </div>
            <!-- Controls //-->

            <!-- Calendar //-->
            <div v-if="state.mode === 'day'" class="space-y-2 text-sm dark:text-gray-200 text-gray-700 text-center">
              <div class="grid grid-cols-7 gap-1">
                <span class="p-2">S</span>
                <span class="p-2">M</span>
                <span class="p-2">T</span>
                <span class="p-2">W</span>
                <span class="p-2">T</span>
                <span class="p-2">F</span>
                <span class="p-2">S</span>
              </div>
              <div v-for="(week, weekIndex) in state.chunkedLinks" :key="'row-' + weekIndex"
                class="grid grid-cols-7 gap-1">
                <template v-for="(date, dayIndex) in week" :key="'date-' + weekIndex + '-' + dayIndex">
                  <button v-if="date.enabled" :class="{
                    'border dark:border-primary-500 border-primary-600': picker.isToday(date.date),
                    'bg-primary-600 dark:bg-primary-700/80 text-white': picker.isSameDate(date.date, state.selected),
                    'hover:bg-gray-200 dark:hover:bg-gray-700/50': !picker.isSameDate(date.date, state.selected)
                  }" class="p-2 rounded-full" @click="picker.setDate(date.date)">
                    {{ date.date.getDate() }}
                  </button>
                  <span v-else class="p-2 text-gray-400">{{ date.date.getDate() }}</span>
                </template>
              </div>
            </div>
            <!-- Calendar //-->

            <!-- Year Chooser //-->
            <div v-if="state.mode === 'year'" class="space-y-2 text-sm dark:text-gray-200 text-gray-700 text-center">
              <div v-for="(group, groupIndex) in state.chunkedLinks" :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1">
                <template v-for="(year, yearIndex) in group" :key="'year-' + groupIndex + '-' + yearIndex">
                  <button :class="{
                    'border dark:border-primary-500 border-primary-600': picker.isThisYear(year.date),
                    'bg-primary-600 dark:bg-primary-700/80 text-white': picker.isSameYear(year.date, state.selected),
                    'hover:bg-gray-200 dark:hover:bg-gray-700/50': !picker.isSameYear(year.date, state.selected)
                  }" class="p-2 rounded-full" @click="picker.setYear(year.date)">
                    {{ year.date.getFullYear() }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Year Chooser //-->

            <!-- Month Chooser //-->
            <div v-if="state.mode === 'month'" class="space-y-2 text-sm dark:text-gray-200 text-gray-700 text-center">
              <div v-for="(group, groupIndex) in state.chunkedLinks" :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1">
                <template v-for="(month, monthIndex) in group" :key="'month-' + groupIndex + '-' + monthIndex">
                  <button :class="{
                    'border dark:border-primary-500 border-primary-600': picker.isThisMonth(month.date),
                    'bg-primary-600 dark:bg-primary-700/80 text-white': picker.isSameMonth(
                      month.date,
                      state.selected
                    ),
                    'hover:bg-gray-200 dark:hover:bg-gray-700/50': !picker.isSameMonth(month.date, state.selected)
                  }" class="p-2 rounded-full" @click="picker.setMonth(month.date)">
                    {{ picker.getMonthName(month.date, true) }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Month Chooser //-->

            <!-- Time Chooser //-->
            <div v-if="state.mode === 'hour' || state.mode === 'minute'"
              class="space-y-2 text-sm dark:text-gray-200 text-gray-700 text-center pt-4">
              <div
                class="relative rounded-[100%] w-[260px] h-[260px] cursor-default my-0 mx-auto bg-gray-200 dark:bg-gray-500">
                <span
                  class="top-1/2 left-1/2 w-[6px] h-[6px] -translate-y-1/2 -translate-x-1/2 rounded-[50%] dark:bg-primary-700/80 bg-primary-600 absolute"></span>
                <div
                  :style="'transform: rotateZ(' + selectedDigit?.rotation.toString() + 'deg); height: calc(40% + 1px)'"
                  class="dark:bg-primary-700/80 bg-primary-600 bottom-1/2 h-2/5 start-[calc(50%-1px)] rtl:!left-auto origin-[center_bottom_0] w-[2px] absolute">
                  <div
                    class="-top-[21px] -left-[15px] w-[4px] border-[14px] border-solid dark:border-primary-700/80 border-primary-600 h-[4px] box-content rounded-[100%] absolute dark:bg-primary-700/80 bg-primary-600">
                  </div>
                </div>
                <template v-for="digit in state.clockFace" :key="'clock-digit-' + digit.label">
                  <button
                    :class="selectedDigit?.value !== digit?.value ? 'dark:hover:bg-gray-700/50 hover:bg-gray-300' : 'text-white'"
                    :style="digit.style"
                    class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                    @click="setDigit(digit)">
                    <span>{{ digit.label }}</span>
                  </button>
                </template>
              </div>
            </div>

            <!-- Time Chooser //-->

            <!-- Buttons //-->
            <div class="flex justify-between px-2 py-4 text-sm">
              <button class="uppercase tracking-wide dark:hover:bg-gray-700/50 hover:bg-gray-200 rounded-md px-2 py-1"
                @click="clearDate">
                clear
              </button>
              <div class="flex space-x-2">
                <button class="uppercase tracking-wide dark:hover:bg-gray-700/50 hover:bg-gray-200 rounded-md px-2 py-1"
                  @click="handleClose">
                  cancel
                </button>
                <button class="uppercase tracking-wide dark:hover:bg-gray-700/50 hover:bg-gray-200 rounded-md px-2 py-1"
                  @click="handleOK">
                  ok
                </button>
              </div>
            </div>
            <!-- Buttons //-->
          </div>
          <!-- Content //-->
        </div>
      </div>
    </transition>
    <!-- Dialog //-->
  </div>
</template>
