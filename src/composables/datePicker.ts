import { computed, reactive, watch } from 'vue'

const state = reactive<DatePickerState>({
  mode: 'day',
  selected: new Date(),
  links: [],
  chunkedLinks: [],
  clockFace: []
})


const pageTitle = computed(() => {
  switch (state.mode) {
    case 'year': {
      if (state.chunkedLinks.length === 0 || state.chunkedLinks[0].length === 0) {
        return 'no-data'
      }
      const first = state.chunkedLinks[0][0].date.getFullYear()
      const lastSubArray = state.chunkedLinks[state.chunkedLinks.length - 1]
      const last = lastSubArray[lastSubArray.length - 1].date.getFullYear()
      return `${first} - ${last}`
    }
    case 'day':
      return `${getMonthName(state.selected, true)} ${state.selected.getFullYear()}`
    case 'hour':
      return state.selected.getHours().toString()
    case 'minute':
      return state.selected.getMinutes().toString()
    case 'month':
      return state.selected.getFullYear().toString()
    default:
      return ''
  }
})

const selectedDigit = computed(() => {

  let digit: ClockDigit

  switch (state.mode) {
    case 'hour':
      digit = state.clockFace.find((digit) => digit.value === state.selected.getHours())!
      break;
    default: {
      const minute = Math.floor(state.selected.getMinutes() / 5) * 5
      digit = state.clockFace.find((digit) => digit.value === minute)!
    }
      break;
  }

  return digit
});

/**
 * DatePickerState represents the state of the date picker
 */
interface DatePickerState {
  selected: Date
  links: CalendarLink[]
  chunkedLinks: CalendarLink[][]
  mode: DatePickerMode
  clockFace: ClockDigit[]
}

/**
 * Datepicker Mode
 */
type DatePickerMode = 'year' | 'month' | 'day' | 'hour' | 'minute'

/**
 * CalendarLink represents a link on a calendar
 */
interface CalendarLink {
  date: Date
  enabled: boolean
}

/**
 * ClickDigit represents a digit on a clock face
 */
interface ClockDigit {
  style: string
  label: string
  value: number
  rotation: number
}

/**
 * ClockDigits represents a collection of all the digits on a clock face
 */
type ClockDigits = ClockDigit[]

/**
 * Check if the given date is in the current year
 */
function isThisYear(date: Date): boolean {
  return new Date().getFullYear() === date.getFullYear()
}

/**
 * Check if the given date is in the current month
 */
function isThisMonth(date: Date): boolean {
  return new Date().getMonth() === date.getMonth()
}

/**
 * Check if the given date is today
 */
function isToday(date: Date): boolean {
  const today = new Date()
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  )
}

/**
 * Normalize the given date to midnight
 */
function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/**
 * Chunk an array into a 2-dimensional array
 */
function chunk<T>(arr: T[], size: number): T[][] {
  return arr.reduce((acc, item, index) => {
    const i = Math.floor(index / size)
    if (!acc[i]) {
      acc[i] = []
    }
    acc[i].push(item)
    return acc
  }, [] as T[][])
}

/**
 * Get the name of the day
 */
function getDayName(date: Date, short: boolean = false): string {
  const days = short
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

/**
 * Get the name of the month
 */
function getMonthName(date: Date, short: boolean = false): string {
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

/**
 * Generate the clock digits required to display the hour labels
 */
function hourFace(): ClockDigits {
  const face: ClockDigits = []

  face.push({ style: 'left: 114px; bottom: 224px', label: '12', value: 12, rotation: 0 })
  face.push({ style: 'left: 169px; bottom: 209.263px', label: '1', value: 1, rotation: 30 })
  face.push({ style: 'left: 209.263px; bottom: 169px', label: '2', value: 2, rotation: 60 })
  face.push({ style: 'left: 224px; bottom: 114px', label: '3', value: 3, rotation: 90 })
  face.push({ style: 'left: 209.263px; bottom: 59px', label: '4', value: 4, rotation: 120 })
  face.push({ style: 'left: 169px; bottom: 18.7372px', label: '5', value: 5, rotation: 150 })
  face.push({ style: 'left: 114px; bottom: 4px', label: '6', value: 6, rotation: 180 })
  face.push({ style: 'left: 59px; bottom: 18.7372px', label: '7', value: 7, rotation: 210 })
  face.push({ style: 'left: 18.7372px; bottom: 59px', label: '8', value: 8, rotation: 240 })
  face.push({ style: 'left: 4px; bottom: 114px', label: '9', value: 9, rotation: 270 })
  face.push({ style: 'left: 18.7372px; bottom: 169px', label: '10', value: 10, rotation: 300 })
  face.push({ style: 'left: 59px; bottom: 209.263px', label: '11', value: 11, rotation: 330 })

  return face
}

/**
 * Generate the clock digits required to display the minute labels
 */
function minuteFace(): ClockDigits {
  const face: ClockDigits = []

  face.push({ style: 'left: 114px; bottom: 224px', label: '00', value: 0, rotation: 0 })
  face.push({ style: 'left: 169px; bottom: 209.263px', label: '05', value: 5, rotation: 30 })
  face.push({ style: 'left: 209.263px; bottom: 169px', label: '10', value: 10, rotation: 60 })
  face.push({ style: 'left: 224px; bottom: 114px', label: '15', value: 15, rotation: 90 })
  face.push({ style: 'left: 209.263px; bottom: 59px', label: '20', value: 20, rotation: 120 })
  face.push({ style: 'left: 169px; bottom: 18.7372px', label: '25', value: 25, rotation: 150 })
  face.push({ style: 'left: 114px; bottom: 4px', label: '30', value: 30, rotation: 180 })
  face.push({ style: 'left: 59px; bottom: 18.7372px', label: '35', value: 35, rotation: 210 })
  face.push({ style: 'left: 18.7372px; bottom: 59px', label: '40', value: 40, rotation: 240 })
  face.push({ style: 'left: 4px; bottom: 114px', label: '45', value: 45, rotation: 270 })
  face.push({ style: 'left: 18.7372px; bottom: 169px', label: '50', value: 50, rotation: 300 })
  face.push({ style: 'left: 59px; bottom: 209.263px', label: '55', value: 55, rotation: 330 })

  return face
}

/**
 * Check if months match in provided dates
 */
function isSameMonth(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth()
}

/**
 * Check if years match in provided dates
 */
function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear()
}

/**
 * Check if dates match
 */
function isSameDate(date1: Date, date2: Date): boolean {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate()
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return `${getDayName(date, true)}, ${getMonthName(date, true)} ${date.getDate()} ${date.getFullYear()}`
}

/**
 * Generate the calendar links for the given month
 */
function getCalendarLinks(date: Date): CalendarLink[] {
  const days: CalendarLink[] = []
  date.setDate(1)
  const dayOfWeek = date.getDay()

  // Add days for prior month
  for (let i = dayOfWeek; i > 0; i--) {
    const d = new Date(date)
    d.setDate(date.getDate() - i)
    days.push({ date: d, enabled: false })
  }

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

  for (let i = 0; i < daysInMonth; i++) {
    const d = new Date(date)
    d.setDate(date.getDate() + i)
    days.push({ date: d, enabled: true })
  }

  // Add days for next month
  const remaining = (7 - (days.length % 7)) % 7
  for (let i = 0; i < remaining; i++) {
    const d = new Date(date)
    d.setDate(date.getDate() + daysInMonth + i)
    days.push({ date: d, enabled: false })
  }
  return days
}

/**
 * Get the years for the given date
 */
function getCalendarLinkYears(date: Date): CalendarLink[] {
  const years: CalendarLink[] = []
  const start = date.getFullYear()-(date.getFullYear() % 24)

  for (let i = start; i < start+24; i++) {
    const d = new Date(date)
    d.setFullYear(i)
    years.push({ date: d, enabled: true })
  }

  return years
}

/**
 * Get the months for the given date
 */
function getCalendarLinkMonths(date: Date): CalendarLink[] {
  const months: CalendarLink[] = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(date)
    d.setMonth(i)
    months.push({ date: d, enabled: true })
  }

  return months
}

/**
 * Set the time to AM
 */
function setAM() {
  state.selected.setHours(state.selected.getHours() % 12)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the time to PM
 */
function setPM() {
  state.selected.setHours(state.selected.getHours() % 12 + 12)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the digit of the selected date
 */
function setDigit(digit: ClockDigit) {
  switch (state.mode) {
    case 'hour':
      setHour(digit.value)
      state.mode = 'minute'
      break

    case 'minute':
      setMinute(digit.value)
      break
  }
}

/**
  * Set the hour of the selected date
 */
function setHour(hour: number) {
  state.selected.setHours(hour)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the minute of the selected date
 */
function setMinute(minute: number) {
  state.selected.setMinutes(minute)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the day of the selectedDate
 */
function setDate(date: Date) {
  state.selected.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  state.selected = new Date(state.selected.getTime())
  state.mode = 'hour'
}

/**
 * Set the month of the selectedDate
 */
function setMonth(date: Date) {
  state.selected.setFullYear(date.getFullYear())
  state.selected.setMonth(date.getMonth())
  state.selected = new Date(state.selected.getTime())
  state.mode = 'day'
}

/**
 * Set the year of the selectedDate
 */
function setYear(date: Date) {
  state.selected.setFullYear(date.getFullYear())
  state.selected = new Date(state.selected.getTime())
  state.mode = 'month'
}

/**
 * Select the previous year page
 */
function prevYearPage() {
  const year = state.selected.getFullYear()
  state.selected.setFullYear(year-year%24-1)
  state.selected = new Date(state.selected.getTime())
  loadYears()
}


/**
 * Select the next year page
 */
function nextYearPage() {
  const year = state.selected.getFullYear()
  state.selected.setFullYear(year+24  - year%24)
  state.selected = new Date(state.selected.getTime())
  loadYears()
}

/**
 * Select the previous year
 */
function prevYear() {
  state.selected.setFullYear(state.selected.getFullYear() - 1)
  state.selected = new Date(state.selected.getTime())
  loadMonths()
}

/**
 * Select the next year
 */
function nextYear() {
  state.selected.setFullYear(state.selected.getFullYear() + 1)
  state.selected = new Date(state.selected.getTime())
  loadMonths()
}

/**
 * Select the previous month
 */
function prevMonth() {
  state.selected.setMonth(state.selected.getMonth() - 1)
  state.selected = new Date(state.selected.getTime())
  loadDays()
}

/**
 * Select the next month
 */
function nextMonth() {
  state.selected.setMonth(state.selected.getMonth() + 1)
  state.selected = new Date(state.selected.getTime())
  loadDays()
}


/**
 * Show the next page of calendar links
 */
function nextPage(): void {
  switch (state.mode) {
    case 'year': return nextYearPage()
    case 'month': return nextYear()
    case 'day': return nextMonth()
  }
}

/**
 * Show the previous page of calendar links
 */
function prevPage(): void {
  switch (state.mode) {
    case 'year': return prevYearPage()
    case 'month': return prevYear()
    case 'day': return prevMonth()
  }
}



/**
 * Initialize the date picker
 */
function init() {
  state.links = getCalendarLinks(state.selected)
  state.chunkedLinks = chunk(state.links, 7)
}

function loadYears() {
  state.links = getCalendarLinkYears(state.selected)
  state.chunkedLinks = chunk(state.links, 4)
}

function loadMonths() {
  state.links = getCalendarLinkMonths(state.selected)
  state.chunkedLinks = chunk(state.links, 4)
}

function loadDays() {
  state.links = getCalendarLinks(state.selected)
  state.chunkedLinks = chunk(state.links, 7)
}

function loadHours() {
  state.clockFace = hourFace()
}

function loadMinutes() {
  state.clockFace = minuteFace()
}

watch(() => state.mode, (mode) => {
  switch (mode) {
    case 'year': return loadYears()
    case 'month': return loadMonths()
    case 'day': return loadDays()
    case 'hour': return loadHours()
    case 'minute': return loadMinutes()
  }
})
export {
  state,
  pageTitle,
  selectedDigit,
  type DatePickerState,
  type DatePickerMode,
  type CalendarLink,
  type ClockDigits,
  type ClockDigit,
  isThisYear,
  isThisMonth,
  isToday,
  normalizeDate,
  chunk,
  getMonthName,
  getDayName,
  hourFace,
  minuteFace,
  isSameMonth,
  isSameYear,
  isSameDate,
  formatDate,
  getCalendarLinks,
  getCalendarLinkYears,
  getCalendarLinkMonths,
  setAM,
  setPM,
  setDigit,
  setMinute,
  setHour,
  setDate,
  setMonth,
  setYear,
  prevYear,
  nextYear,
  nextPage,
  prevPage,
  init
}
