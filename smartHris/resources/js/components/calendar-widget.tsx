import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

export default function CalendarWidget() {
  const today = new Date() 
  
  const [viewDate, setViewDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return day === 0 ? 6 : day - 1
  }

  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    )
  }

  const daysInMonth = getDaysInMonth(viewDate)
  const firstDayIndex = getFirstDayOfMonth(viewDate)

  const emptyDays = Array.from({ length: firstDayIndex })
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="flex h-full w-full flex-col bg-white p-5">
      
      <h2 className="mb-4 text-xl font-bold text-slate-900 shrink-0">Kalender</h2>

      <div className="mb-4 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={prevMonth}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F1] text-emerald-800 transition-colors hover:bg-emerald-100"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <span className="text-lg font-semibold text-slate-900">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5F1] text-emerald-800 transition-colors hover:bg-emerald-100"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center flex-1">
        {DAYS.map((day) => (
          <div key={day} className="flex items-center justify-center text-sm font-medium text-slate-400">
            {day}
          </div>
        ))}

        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {currentMonthDays.map((day) => {
          const thisDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
          
          const isToday = isSameDay(thisDate, today)

          return (
            <div key={day} className="flex items-center justify-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all cursor-default ${
                  isToday
                    ? 'bg-[#115E59] font-bold text-white shadow-md shadow-emerald-900/20' 
                    : 'text-slate-700'
                }`}
              >
                {day}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}