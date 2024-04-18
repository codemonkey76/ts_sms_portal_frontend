<script lang="ts" setup>
import { type CalendarLink, getDates, getMonths, getYears } from '@/composables/calendar'
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from '@heroicons/vue/24/solid'
import { computed, defineEmits, onMounted, ref, watch } from 'vue'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
const isThisYear = (year: number) => {
  const today = new Date()
  return year === today.getFullYear()
}
const isThisMonth = (date: Date) => {
  const today = new Date()
  return date.getMonth() === today.getMonth()
}
const isToday = (date: CalendarLink) => {
  const today = new Date()
  return (
    date.date.getDate() === today.getDate() &&
    date.date.getMonth() === today.getMonth() &&
    date.date.getFullYear() === today.getFullYear()
  )
}
const isSelectedMonth = (date: Date) => {
  if (!selectedDate.value) {
    return false
  }

  return date.getMonth() === selectedDate.value.getMonth()
}
const isSelectedYear = (year: number) => {
  if (!selectedDate.value) {
    return false
  }

  return year === selectedDate.value.getFullYear()
}
const isSelectedDate = (date: CalendarLink) => {
  if (!selectedDate.value) {
    return false
  }

  const normalizeDate = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const normalizedCalendarDate = normalizeDate(date.date)
  const normalizedSelectedDate = normalizeDate(selectedDate.value)

  return normalizedCalendarDate.getTime() === normalizedSelectedDate.getTime()
}

const selectedDate = ref<Date>(new Date())
const dates = ref<CalendarLink[]>([])
const years = ref<number[]>([])
const months = ref<Date[]>([])

const chunkedMonths = computed(() => {
  return months.value.reduce((acc: Date[][], month, index) => {
    const i = Math.floor(index / 4)
    if (!acc[i]) {
      acc[i] = []
    }
    acc[i].push(month)
    return acc
  }, [])
})

const chunkedYears = computed(() => {
  return years.value.reduce((acc: number[][], year, index) => {
    const i = Math.floor(index / 4)
    if (!acc[i]) {
      acc[i] = []
    }
    acc[i].push(year)
    return acc
  }, [])
})
const chunkedDates = computed(() => {
  return dates.value.reduce((acc: CalendarLink[][], date, index) => {
    const i = Math.floor(index / 7)
    if (!acc[i]) {
      acc[i] = []
    }
    acc[i].push(date)
    return acc
  }, [])
})

const prev = () => {
  switch (state.value) {
    case 'month':
      prevYear()
      break
    case 'date':
      prevMonth()
      break
    case 'year':
      prevYearPage()
      break
  }
}

const next = () => {
  switch (state.value) {
    case 'month':
      nextYear()
      break
    case 'date':
      nextMonth()
      break
    case 'year':
      nextYearPage()
      break
  }
}
const prevYear = () => {
  const year = selectedDate.value.getFullYear()
  selectedDate.value.setFullYear(year - 1)
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}

const prevYearPage = () => {
  const year = selectedDate.value.getFullYear()
  selectedDate.value.setFullYear(year - (year % 24) - 1)
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}
const prevMonth = () => {
  selectedDate.value.setMonth(selectedDate.value.getMonth() - 1)
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}

const nextYear = () => {
  const year = selectedDate.value.getFullYear()
  selectedDate.value.setFullYear(year + 1)
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}

const nextYearPage = () => {
  const year = selectedDate.value.getFullYear()
  selectedDate.value.setFullYear(year + 24 - (year % 24))
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}

const nextMonth = () => {
  selectedDate.value.setMonth(selectedDate.value.getMonth() + 1)
  selectedDate.value = new Date(selectedDate.value.getTime())
  loadData()
}

const getDayName = (date: Date, short: boolean = false): string => {
  const days = short
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}
const getMonthName = (date: Date, short: boolean = false): string => {
  const months = short
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    : [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
  return months[date.getMonth()]
}
const formatDate = (date: Date) => {
  return `${getDayName(date, true)}, ${getMonthName(date, true)} ${date.getDate()} ${date.getFullYear()}`
}
const loadData = () => {
  months.value = getMonths(selectedDate.value)
  dates.value = getDates(selectedDate.value)
  years.value = getYears(selectedDate.value)
}

const model = defineModel<Date | undefined>()
const setMonth = (date: Date) => {
  selectedDate.value.setMonth(date.getMonth())
  selectedDate.value = new Date(selectedDate.value.getTime())
  state.value = 'hour'
}
const setYear = (year: number) => {
  selectedDate.value.setFullYear(year)
  selectedDate.value = new Date(selectedDate.value.getTime())
  state.value = 'month'
}
const setDate = (date: CalendarLink) => {
  selectedDate.value.setFullYear(date.date.getFullYear(), date.date.getMonth(), date.date.getDate())
  selectedDate.value = new Date(selectedDate.value.getTime())
  nextState()
}
const clearDate = () => {
  model.value = undefined
  handleClose()
}
const displayDate = computed(() => {
  return formatDate(selectedDate.value)
})

watch(
  () => props.show,
  (show) => {
    if (show) {
      state.value = 'date'
      selectedDate.value = model.value || new Date()
    }
  }
)
type State = 'year' | 'month' | 'date' | 'hour' | 'minute'
const state = ref<State>('date')

const nextState = () => {
  switch (state.value) {
    case 'date':
      state.value = 'hour'
      break
    case 'hour':
      state.value = 'minute'
      break
    case 'minute':
      state.value = 'date'
      handleClose()
      break
  }
}
const toggleYearState = () => {
  state.value = state.value === 'year' ? 'date' : 'year'
}

const yearStateText = computed(() => {
  console.log(state.value)
  switch (state.value) {
    case 'year':
      return years.value[0] + '-' + years.value[years.value.length - 1]
    case 'date':
      return getMonthName(selectedDate.value, true) + ' ' + selectedDate.value.getFullYear()
    case 'month':
      return selectedDate.value.getFullYear()
    default:
      return ''
  }
})

const isTime = computed(() => state.value === 'hour' || state.value === 'minute')
onMounted(() => {
  loadData()
})
</script>
<template>
  <div v-show="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay //-->
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="show" class="fixed inset-0 transform transition-all" @click="handleClose">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
    </transition>
    <!-- Overlay //-->

    <!-- Dialog //-->
    <transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enter-to-class="opacity-100 translate-y-0 sm:scale-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0 sm:scale-100"
      leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div
        v-show="show"
        class="overflow-hidden bg-white rounded-lg shadow-xl transform transition-all w-[300px]"
      >
        <div class="flex flex-col">
          <!-- Header //-->
          <div class="bg-sky-600 text-white px-4 py-2 rounded-t-md">
            <div class="text-xs uppercase tracking-wide">Select date</div>
            <div class="text-2xl font-semibold py-2 px-4" v-text="displayDate" />
            <div class="flex justify-between">
              <button class="px-10 py-2 hover:bg-sky-700 rounded-lg" @click="state = 'date'">
                <calendar-icon class="h-5 w-5" />
              </button>
              <button class="px-10 py-2 hover:bg-sky-700 rounded-lg" @click="state = 'hour'">
                <clock-icon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <!-- Header //-->

          <!-- Content //-->
          <div class="bg-white rounded-b-md flex flex-col px-2">
            <!-- Controls //-->
            <div v-if="!isTime" class="flex justify-between py-4 px-2">
              <button
                class="text-sm flex space-x-1 items-center font-semibold text-gray-700 hover:bg-gray-200 px-2 py-2 rounded-md"
                @click="toggleYearState"
              >
                <span v-text="yearStateText" />
                <chevron-down-icon class="h-4 w-4 text-gray-600" />
              </button>
              <div class="space-x-6">
                <button class="hover:bg-gray-200 rounded-full p-2 text-gray-600" @click="prev">
                  <chevron-left-icon class="h-4 w-4" />
                </button>
                <button class="hover:bg-gray-200 rounded-full p-2 text-gray-600" @click="next">
                  <chevron-right-icon class="h-4 w-4" />
                </button>
              </div>
            </div>
            <!-- Controls //-->

            <!-- Calendar //-->
            <div v-if="state === 'date'" class="space-y-2 text-sm text-gray-700 text-center">
              <div class="grid grid-cols-7 gap-1">
                <span class="p-2">S</span>
                <span class="p-2">M</span>
                <span class="p-2">T</span>
                <span class="p-2">W</span>
                <span class="p-2">T</span>
                <span class="p-2">F</span>
                <span class="p-2">S</span>
              </div>
              <div
                v-for="(week, weekIndex) in chunkedDates"
                :key="'row-' + weekIndex"
                class="grid grid-cols-7 gap-1"
              >
                <template
                  v-for="(date, dayIndex) in week"
                  :key="'date-' + weekIndex + '-' + dayIndex"
                >
                  <button
                    v-if="date.enabled"
                    :class="{
                      'border border-sky-600': isToday(date),
                      'bg-sky-600 text-white': isSelectedDate(date),
                      'hover:bg-gray-200': !isSelectedDate(date)
                    }"
                    class="p-2 rounded-full"
                    @click="setDate(date)"
                  >
                    {{ date.date.getDate() }}
                  </button>
                  <span v-else class="p-2 text-gray-400">{{ date.date.getDate() }}</span>
                </template>
              </div>
            </div>
            <!-- Calendar //-->

            <!-- Year Chooser //-->
            <div v-if="state === 'year'" class="space-y-2 text-sm text-gray-700 text-center">
              <div
                v-for="(group, groupIndex) in chunkedYears"
                :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1"
              >
                <template
                  v-for="(year, yearIndex) in group"
                  :key="'year-' + groupIndex + '-' + yearIndex"
                >
                  <button
                    :class="{
                      'border border-sky-600': isThisYear(year),
                      'bg-sky-600 text-white': isSelectedYear(year),
                      'hover:bg-gray-200': !isSelectedYear(year)
                    }"
                    class="p-2 rounded-full"
                    @click="setYear(year)"
                  >
                    {{ year }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Year Chooser //-->

            <!-- Month Chooser //-->
            <div v-if="state === 'month'" class="space-y-2 text-sm text-gray-700 text-center">
              <div
                v-for="(group, groupIndex) in chunkedMonths"
                :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1"
              >
                <template
                  v-for="(month, monthIndex) in group"
                  :key="'month-' + groupIndex + '-' + monthIndex"
                >
                  <button
                    :class="{
                      'border border-sky-600': isThisMonth(month),
                      'bg-sky-600 text-white': isSelectedMonth(month),
                      'hover:bg-gray-200': !isSelectedMonth(month)
                    }"
                    class="p-2 rounded-full"
                    @click="setMonth(month)"
                  >
                    {{ getMonthName(month, true) }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Month Chooser //-->

            <!-- Time Chooser //-->
            <div v-if="state === 'hour'" class="space-y-2 text-sm text-gray-700 text-center pt-4">
              <div
                class="relative rounded-[100%] w-[260px] h-[260px] cursor-default my-0 mx-auto bg-[#eee]"
              >
                <span
                  class="top-1/2 left-1/2 w-[6px] h-[6px] -translate-y-1/2 -translate-x-1/2 rounded-[50%] bg-primary absolute"
                ></span>
                <span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 114px; bottom: 224px"
                  ><span>12</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 169px; bottom: 209.263px"
                  ><span>1</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 209.263px; bottom: 169px"
                  ><span>2</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 224px; bottom: 114px"
                  ><span>3</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 209.263px; bottom: 59px"
                  ><span>4</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 169px; bottom: 18.7372px"
                  ><span>5</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 114px; bottom: 4px"
                  ><span>6</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 59px; bottom: 18.7372px"
                  ><span>7</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 18.7372px; bottom: 59px"
                  ><span>8</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 4px; bottom: 114px"
                  ><span>9</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 18.7372px; bottom: 169px"
                  ><span>10</span></span
                ><span
                  class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  style="left: 59px; bottom: 209.263px"
                  ><span>11</span></span
                >
              </div>
            </div>

            <!-- Time Chooser //-->

            <!-- Buttons //-->
            <div class="flex justify-between px-2 py-4 text-sm">
              <button
                class="uppercase tracking-wide hover:bg-gray-200 rounded-md px-2 py-1"
                @click="clearDate"
              >
                clear
              </button>
              <div class="flex space-x-2">
                <button
                  class="uppercase tracking-wide hover:bg-gray-200 rounded-md px-2 py-1"
                  @click="handleClose"
                >
                  cancel
                </button>
                <button class="uppercase tracking-wide hover:bg-gray-200 rounded-md px-2 py-1">
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
