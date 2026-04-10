import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DayPicker } from 'react-day-picker'
import { format, parse, isValid, startOfDay, setMonth, setYear, getMonth, getYear } from 'date-fns'
import { CalendarDays, X } from 'lucide-react'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const TODAY = startOfDay(new Date())
const CURRENT_YEAR = TODAY.getFullYear()
const MIN_YEAR = 1980

function buildYearOptions(disableFuture) {
  const maxYear = disableFuture ? CURRENT_YEAR : CURRENT_YEAR + 5
  const years = []
  for (let y = maxYear; y >= MIN_YEAR; y--) years.push(y)
  return years
}

/**
 * DatePickerField
 *
 * Props:
 *   label         string   — field label
 *   value         string   — 'YYYY-MM-DD' or ''
 *   onChange      fn(str)  — called with 'YYYY-MM-DD' or ''
 *   disableFuture bool     — blocks all future dates
 *   optional      bool     — shows "(optional)" annotation
 *   error         string   — inline error
 */
export default function DatePickerField({ label, value, onChange, disableFuture = false, optional = false, error }) {
  const parsed = value ? parse(value, 'yyyy-MM-dd', new Date()) : null
  const selected = parsed && isValid(parsed) ? parsed : undefined

  const [open, setOpen] = useState(false)
  const [month, setMonthState] = useState(selected || TODAY)
  const [pos, setPos] = useState({ top: 0, left: 0 })

  const triggerRef = useRef(null)
  const popoverRef = useRef(null)

  const yearOptions = buildYearOptions(disableFuture)

  // Reposition whenever open changes
  const openPicker = () => {
    if (!triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const POPOVER_H = 360
    const POPOVER_W = 320
    const spaceBelow = window.innerHeight - rect.bottom
    const topVal = spaceBelow >= POPOVER_H
      ? rect.bottom + window.scrollY + 6
      : rect.top + window.scrollY - POPOVER_H - 6

    // Horizontally: try to align left; shift left if it would overflow
    let leftVal = rect.left + window.scrollX
    if (leftVal + POPOVER_W > window.innerWidth - 16) {
      leftVal = window.innerWidth - POPOVER_W - 16
    }

    setPos({ top: topVal, left: leftVal })
    setMonthState(selected || TODAY)
    setOpen(true)
  }

  // Close on outside click or Escape
  useEffect(() => {
    const onMouseDown = (e) => {
      if (
        open &&
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const handleSelect = (date) => {
    onChange(date ? format(date, 'yyyy-MM-dd') : '')
    setOpen(false)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange('')
  }

  const handleMonthChange = (e) => {
    setMonthState(prev => setMonth(prev, Number(e.target.value)))
  }

  const handleYearChange = (e) => {
    setMonthState(prev => setYear(prev, Number(e.target.value)))
  }

  const disabledDays = disableFuture ? { after: TODAY } : undefined
  const displayValue = selected ? format(selected, 'dd MMM yyyy') : null

  return (
    <div className="flex flex-col space-y-2">
      {/* Label */}
      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground pl-1">
        {label}
        {optional && (
          <span className="ml-2 text-muted-foreground/50 normal-case tracking-normal font-normal text-[10px]">(optional)</span>
        )}
      </label>

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={openPicker}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl border transition-all focus:outline-none focus:ring-1 focus:ring-primary/50 text-left ${
          error
            ? 'border-destructive/40 bg-destructive/5'
            : open
            ? 'border-primary/50 bg-background/80 ring-1 ring-primary/20'
            : 'border-border/50 bg-background/50 hover:border-border/80'
        }`}
      >
        <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className={`flex-1 ${displayValue ? 'text-foreground' : 'text-muted-foreground/40'}`}>
          {displayValue || 'Select date…'}
        </span>
        {displayValue && (
          <span
            role="button"
            tabIndex={-1}
            onClick={handleClear}
            className="text-muted-foreground/40 hover:text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </span>
        )}
      </button>

      {error && <p className="text-destructive text-[10px] pl-1">{error}</p>}

      {/* Portal Calendar */}
      {open && createPortal(
        <div
          ref={popoverRef}
          style={{ position: 'absolute', top: pos.top, left: pos.left, width: 320, zIndex: 9999 }}
          className="bg-card border border-border/40 rounded-2xl shadow-2xl overflow-hidden select-none"
        >
          {/* Month + Year navigation header */}
          <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-border/10">
            <div className="flex-1 flex items-center gap-2">
              {/* Month select */}
              <div className="relative flex-1">
                <select
                  value={getMonth(month)}
                  onChange={handleMonthChange}
                  className="w-full appearance-none text-[11px] font-bold uppercase tracking-widest text-foreground bg-muted/20 border border-border/30 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50 cursor-pointer"
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>{m}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Year select */}
              <div className="relative w-[90px]">
                <select
                  value={getYear(month)}
                  onChange={handleYearChange}
                  className="w-full appearance-none text-[11px] font-bold text-foreground bg-muted/20 border border-border/30 rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary/50 cursor-pointer"
                >
                  {yearOptions.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-all"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* DayPicker — hidden native caption, we control month externally */}
          <div className="px-3 pb-4 pt-1">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              month={month}
              onMonthChange={setMonthState}
              disabled={disabledDays}
              hideNavigation
              showOutsideDays={false}
              classNames={{
                root: 'w-full',
                months: 'w-full',
                month: 'w-full',
                month_caption: 'hidden',
                nav: 'hidden',
                weeks: 'w-full space-y-0.5',
                weekdays: 'flex w-full mb-1',
                weekday: 'flex-1 text-center text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50 py-1.5',
                week: 'flex w-full',
                day: 'flex-1 flex items-center justify-center',
                day_button: 'w-9 h-9 rounded-xl text-[12px] font-medium transition-all text-foreground hover:bg-muted/30 focus:outline-none',
                selected: '[&>button]:!bg-primary [&>button]:!text-primary-foreground [&>button]:font-bold [&>button]:shadow-[0_0_12px_rgba(99,102,241,0.35)]',
                today: '[&>button]:ring-1 [&>button]:ring-primary/40 [&>button]:text-primary',
                disabled: '[&>button]:!text-muted-foreground/20 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent',
              }}
            />
          </div>

          {disableFuture && (
            <div className="px-4 pb-3">
              <p className="text-[9px] text-muted-foreground/40 text-center tracking-wider uppercase">
                Future dates unavailable
              </p>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
