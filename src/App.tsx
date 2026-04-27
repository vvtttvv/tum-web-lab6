import { type FormEvent, useEffect, useState } from 'react'
import { CreateProjectModal } from './features/projects/components/CreateProjectModal'
import { DayTabs } from './features/projects/components/DayTabs'
import { ProjectsFilters } from './features/projects/components/ProjectsFilters'
import { ProjectsFooterNav } from './features/projects/components/ProjectsFooterNav'
import { ProjectsHeader } from './features/projects/components/ProjectsHeader'
import { ProjectsList } from './features/projects/components/ProjectsList'
import { buildId, days, defaultProjectForm } from './features/projects/model/constants'
import type { ProjectFormState, Session, Theme } from './features/projects/model/types'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  const [sessions, setSessions] = useState<Session[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [form, setForm] = useState<ProjectFormState>(defaultProjectForm)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = isCreateOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isCreateOpen])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const handleCreateSession = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleanName = form.projectName.trim()
    if (!cleanName) {
      return
    }

    const nextSession: Session = {
      id: buildId(),
      title: cleanName,
      elapsed: '0h 00m',
      total: form.duration,
      color: form.selectedColor,
    }

    setSessions((prev) => [...prev, nextSession])
    setIsCreateOpen(false)
    setForm(defaultProjectForm)
  }

  const patchForm = (patch: Partial<ProjectFormState>) => {
    setForm((prev) => ({ ...prev, ...patch }))
  }

  return (
    <main className="layout-shell">
      <section className="dashboard">
        <div className="dashboard-section">
          <ProjectsHeader theme={theme} onToggleTheme={toggleTheme} />
          <DayTabs days={days} />
          <ProjectsFilters count={sessions.length} />
        </div>

        <div className="projects-scroll-area">
          <ProjectsList sessions={sessions} />
        </div>

        <div className="dashboard-section dashboard-footer">
          <ProjectsFooterNav onCreate={() => setIsCreateOpen(true)} />
        </div>
      </section>

      <CreateProjectModal
        open={isCreateOpen}
        form={form}
        onChange={patchForm}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateSession}
      />
    </main>
  )
}

export default App
