import { reactive } from 'vue'

const state = reactive<DatePickerState>({
  mode: 'day',
  selected: new Date(),
  links: [],
  chunkedLinks: [],
  clockFace: []
})

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

  face.push({ style: 'left: 114px; bottom: 224px', label: '12' })
  face.push({ style: 'left: 169px; bottom: 209.263px', label: '1' })
  face.push({ style: 'left: 209.263px; bottom: 169px', label: '2' })
  face.push({ style: 'left: 224px; bottom: 114px', label: '3' })
  face.push({ style: 'left: 209.263px; bottom: 59px', label: '4' })
  face.push({ style: 'left: 169px; bottom: 18.7372px', label: '5' })
  face.push({ style: 'left: 114px; bottom: 4px', label: '6' })
  face.push({ style: 'left: 59px; bottom: 18.7372px', label: '7' })
  face.push({ style: 'left: 18.7372px; bottom: 59px', label: '8' })
  face.push({ style: 'left: 4px; bottom: 114px', label: '9' })
  face.push({ style: 'left: 18.7372px; bottom: 169px', label: '10' })
  face.push({ style: 'left: 59px; bottom: 209.263px', label: '11' })

  return face
}

/**
 * Generate the clock digits required to display the minute labels
 */
function minuteFace(): ClockDigits {
  const face: ClockDigits = []

  face.push({ style: 'left: 114px; bottom: 224px', label: '00' })
  face.push({ style: 'left: 169px; bottom: 209.263px', label: '05' })
  face.push({ style: 'left: 209.263px; bottom: 169px', label: '10' })
  face.push({ style: 'left: 224px; bottom: 114px', label: '15' })
  face.push({ style: 'left: 209.263px; bottom: 59px', label: '20' })
  face.push({ style: 'left: 169px; bottom: 18.7372px', label: '25' })
  face.push({ style: 'left: 114px; bottom: 4px', label: '30' })
  face.push({ style: 'left: 59px; bottom: 18.7372px', label: '35' })
  face.push({ style: 'left: 18.7372px; bottom: 59px', label: '40' })
  face.push({ style: 'left: 4px; bottom: 114px', label: '45' })
  face.push({ style: 'left: 18.7372px; bottom: 169px', label: '50' })
  face.push({ style: 'left: 59px; bottom: 209.263px', label: '55' })

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
  // 24 years will be returned at a time
  const currentYearPosition = date.getFullYear() % 24
  const years: CalendarLink[] = []

  for (let i = 0; i < 24; i++) {
    const d = new Date(date)
    date.setFullYear(date.getFullYear() - currentYearPosition + i)
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
 * Set the day of the selectedDate
 */
function setDate(date: Date) {
  state.selected.setFullYear(date.getFullYear(), date.getMonth(), date.getDate())
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the month of the selectedDate
 */
function setMonth(date: Date) {
  state.selected.setFullYear(date.getFullYear())
  state.selected.setMonth(date.getMonth())
  state.selected = new Date(state.selected.getTime())
}

/**
 * Set the year of the selectedDate
 */
function setYear(date: Date) {
  state.selected.setFullYear(date.getFullYear())
  state.selected = new Date(state.selected.getTime())
}

/**
 * Select the previous year
 */
function prevYear() {
  state.selected.setFullYear(state.selected.getFullYear() - 1)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Select the next year
 */
function nextYear() {
  state.selected.setFullYear(state.selected.getFullYear() + 1)
  state.selected = new Date(state.selected.getTime())
}

/**
 * Initialize the date picker
 */
function init() {
  state.links = getCalendarLinks(state.selected)
  state.chunkedLinks = chunk(state.links, 7)
}

export {
  state,
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
  setDate,
  setMonth,
  setYear,
  prevYear,
  nextYear,
  init
}
