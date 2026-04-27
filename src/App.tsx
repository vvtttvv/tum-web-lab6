import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type Day = {
  label: string
  date: string
  active?: boolean
}

type Session = {
  title: string
  elapsed: string
  total: string
  color: 'coral' | 'lime' | 'violet'
}

const days: Day[] = [
  { label: 'Fri', date: '27' },
  { label: 'Sat', date: '28' },
  { label: 'Sun', date: '29' },
  { label: 'Mon', date: '30' },
  { label: 'Tue', date: '31' },
  { label: 'Wed', date: '1', active: true },
]

const sessions: Session[] = [
  { title: 'Drawing', elapsed: '0h 00m', total: '1h 00m', color: 'coral' },
  { title: 'Exercises', elapsed: '0h 00m', total: '1h 00m', color: 'lime' },
  { title: 'Practice', elapsed: '0h 00m', total: '3h 56m', color: 'violet' },
]

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <main className="layout-shell px-4 py-6 sm:px-6 sm:py-8">
      <section className="dashboard mx-auto max-w-5xl rounded-[28px] p-4 sm:p-7">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-title)] sm:text-3xl">
            All projects
          </h1>

          <div className="flex items-center gap-3">
            <button className="icon-btn" aria-label="Menu" type="button">
              <span className="icon-line"></span>
              <span className="icon-line"></span>
              <span className="icon-line short"></span>
            </button>
            <button
              className="theme-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </header>

        <div className="mb-4 flex gap-3 overflow-x-auto pb-2">
          {days.map((day) => (
            <article
              key={`${day.label}-${day.date}`}
              className={`day-pill${day.active ? ' active' : ''}`}
            >
              <span className="day-label">{day.label}</span>
              <span className="day-date">{day.date}</span>
            </article>
          ))}
        </div>

        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--color-muted)]">Filter</span>
            <button className="chip" type="button">
              All (3)
            </button>
            <button className="chip" type="button">
              Due (3)
            </button>
          </div>

          <div className="remaining-box">
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
              Remaining
            </span>
            <strong className="text-2xl font-medium text-[var(--color-title)]">5h 56m</strong>
          </div>
        </div>

        <section className="space-y-4">
          {sessions.map((session) => (
            <article key={session.title} className="task-card">
              <div className="flex items-center gap-4">
                <button
                  className={`play-btn is-${session.color}`}
                  aria-label="Start task"
                  type="button"
                >
                  ▶
                </button>

                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-2xl leading-none text-[var(--color-title)]">{session.title}</h2>
                      <p className="mt-1 text-lg text-[var(--color-muted)]">
                        {session.elapsed} / {session.total}
                      </p>
                    </div>
                    <span className="text-2xl text-[var(--color-soft)]">›</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: '0%' }}></div>
                    </div>
                    <span className="w-10 text-right text-sm text-[var(--color-muted)]">0%</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <nav className="bottom-nav mt-7">
          <a href="#" className="nav-link active">
            Projects
          </a>
          <a href="#" className="nav-link">
            Sessions
          </a>
          <button type="button" className="center-fab" aria-label="Crown action">
            ★
          </button>
          <a href="#" className="nav-link">
            Tasks
          </a>
          <a href="#" className="nav-link">
            Stats
          </a>
        </nav>
      </section>
    </main>
  )
}

export default App
