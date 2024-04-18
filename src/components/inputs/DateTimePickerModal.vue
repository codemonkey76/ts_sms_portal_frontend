<script lang="ts" setup>
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon
} from '@heroicons/vue/24/solid'
import { computed, defineEmits, onMounted, watch } from 'vue'
import * as picker from '@/composables/datePicker'

const props = defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
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
      picker.state.selected = model.value || new Date()
    }
  }
)

const pageTitle = computed(() => {
  switch (picker.state.mode) {
    case 'year': {
      if (picker.state.chunkedLinks.length === 0 || picker.state.chunkedLinks[0].length === 0) {
        return 'no-data'
      }
      const first = picker.state.chunkedLinks[0][0].date.getFullYear()
      const lastSubArray = picker.state.chunkedLinks[picker.state.chunkedLinks.length - 1]
      const last = lastSubArray[lastSubArray.length - 1].date.getFullYear()
      return `${first} - ${last}`
    }
    case 'day':
      return `${picker.getMonthName(picker.state.selected, true)} ${picker.state.selected.getFullYear()}`
    case 'hour':
      return picker.state.selected.getHours()
    case 'minute':
      return picker.state.selected.getMinutes()
    default:
      return ''
  }
})
onMounted(() => {
  picker.init()
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
            <div
              class="text-2xl font-semibold py-2 px-4"
              v-text="picker.formatDate(picker.state.selected)"
            />
            <div class="flex justify-between">
              <button
                class="px-10 py-2 hover:bg-sky-700 rounded-lg"
                @click="picker.state.mode = 'day'"
              >
                <calendar-icon class="h-5 w-5" />
              </button>
              <button
                class="px-10 py-2 hover:bg-sky-700 rounded-lg"
                @click="picker.state.mode = 'hour'"
              >
                <clock-icon class="h-5 w-5" />
              </button>
            </div>
          </div>
          <!-- Header //-->

          <!-- Content //-->
          <div class="bg-white rounded-b-md flex flex-col px-2">
            <!-- Controls //-->
            <div
              v-if="picker.state.mode !== 'hour' && picker.state.mode !== 'minute'"
              class="flex justify-between py-4 px-2"
            >
              <button
                class="text-sm flex space-x-1 items-center font-semibold text-gray-700 hover:bg-gray-200 px-2 py-2 rounded-md"
                @click="picker.state.mode = picker.state.mode === 'month' ? 'year' : 'month'"
              >
                <span v-text="pageTitle" />
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
            <div
              v-if="picker.state.mode === 'day'"
              class="space-y-2 text-sm text-gray-700 text-center"
            >
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
                v-for="(week, weekIndex) in picker.state.chunkedLinks"
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
                      'border border-sky-600': picker.isToday(date.date),
                      'bg-sky-600 text-white': picker.isSameDate(date.date, picker.state.selected),
                      'hover:bg-gray-200': !picker.isSameDate(date.date, picker.state.selected)
                    }"
                    class="p-2 rounded-full"
                    @click="picker.setDate(date.date)"
                  >
                    {{ date.date.getDate() }}
                  </button>
                  <span v-else class="p-2 text-gray-400">{{ date.date.getDate() }}</span>
                </template>
              </div>
            </div>
            <!-- Calendar //-->

            <!-- Year Chooser //-->
            <div
              v-if="picker.state.mode === 'year'"
              class="space-y-2 text-sm text-gray-700 text-center"
            >
              <div
                v-for="(group, groupIndex) in picker.state.chunkedLinks"
                :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1"
              >
                <template
                  v-for="(year, yearIndex) in group"
                  :key="'year-' + groupIndex + '-' + yearIndex"
                >
                  <button
                    :class="{
                      'border border-sky-600': picker.isThisYear(year.date),
                      'bg-sky-600 text-white': picker.isSameYear(year.date, picker.state.selected),
                      'hover:bg-gray-200': !picker.isSameYear(year.date, picker.state.selected)
                    }"
                    class="p-2 rounded-full"
                    @click="picker.setYear(year.date)"
                  >
                    {{ year.date.getFullYear() }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Year Chooser //-->

            <!-- Month Chooser //-->
            <div
              v-if="picker.state.mode === 'month'"
              class="space-y-2 text-sm text-gray-700 text-center"
            >
              <div
                v-for="(group, groupIndex) in picker.state.chunkedLinks"
                :key="'row-' + groupIndex"
                class="grid grid-cols-4 gap-1"
              >
                <template
                  v-for="(month, monthIndex) in group"
                  :key="'month-' + groupIndex + '-' + monthIndex"
                >
                  <button
                    :class="{
                      'border border-sky-600': picker.isThisMonth(month.date),
                      'bg-sky-600 text-white': picker.isSameMonth(
                        month.date,
                        picker.state.selected
                      ),
                      'hover:bg-gray-200': !picker.isSameMonth(month.date, picker.state.selected)
                    }"
                    class="p-2 rounded-full"
                    @click="picker.setMonth(month.date)"
                  >
                    {{ picker.getMonthName(month.date, true) }}
                  </button>
                </template>
              </div>
            </div>
            <!-- Month Chooser //-->

            <!-- Time Chooser //-->
            <div
              v-if="picker.state.mode === 'hour'"
              class="space-y-2 text-sm text-gray-700 text-center pt-4"
            >
              <div
                class="relative rounded-[100%] w-[260px] h-[260px] cursor-default my-0 mx-auto bg-[#eee]"
              >
                <span
                  class="top-1/2 left-1/2 w-[6px] h-[6px] -translate-y-1/2 -translate-x-1/2 rounded-[50%] bg-primary absolute"
                ></span>
                <div
                  class="bg-sky-600 bottom-1/2 h-2/5 start-[calc(50%-1px)] rtl:!left-auto origin-[center_bottom_0] w-[2px] absolute"
                  style="transform: rotateZ(90deg); height: calc(40% + 1px)"
                >
                  <div
                    class="-top-[21px] -left-[15px] w-[4px] border-[14px] border-solid border-sky-600 h-[4px] box-content rounded-[100%] absolute"
                    style="background-color: rgb(25, 118, 210)"
                  ></div>
                </div>
                <template
                  v-for="digit in picker.state.clockFace"
                  :key="'clock-digit-' + digit.label"
                >
                  <span
                    :style="digit.style"
                    class="absolute rounded-[100%] w-[32px] h-[32px] text-center cursor-pointer text-[1.1rem] bg-transparent flex justify-center items-center font-light focus:outline-none selection:bg-transparent"
                  >
                    <span>{{ digit.label }}</span>
                  </span>
                </template>
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
