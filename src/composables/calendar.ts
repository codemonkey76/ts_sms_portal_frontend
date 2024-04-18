export type CalendarLink = {
  date: Date
  enabled: boolean
}

export const getDates = (date: Date): CalendarLink[] => {
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

export const getYears = (date: Date): number[] => {
  // 24 years will be returned at a time
  const currentYearPosition = date.getFullYear() % 24
  const years: number[] = []

  for (let i = 0; i < 24; i++) {
    years.push(date.getFullYear() - currentYearPosition + i)
  }

  return years
}

export const getMonths = (date: Date): Date[] => {
  const months: Date[] = []
  for (let i = 0; i < 12; i++) {
    const d = new Date(date)
    d.setMonth(i)
    months.push(d)
  }

  return months
}
