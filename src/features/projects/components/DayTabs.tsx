import type { Day } from '../model/types'

type DayTabsProps = {
  days: Day[]
}

export function DayTabs({ days }: DayTabsProps) {
  return (
    <div className="day-tabs-row">
      {days.map((day) => (
        <article key={`${day.label}-${day.date}`} className={`day-pill${day.active ? ' active' : ''}`}>
          <span className="day-label">{day.label}</span>
          <span className="day-date">{day.date}</span>
        </article>
      ))}
    </div>
  )
}
