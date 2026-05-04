import { type FormEvent, useEffect, useState } from 'react'
import { CreateProjectModal } from './features/projects/components/CreateProjectModal'
import { DayTabs } from './features/projects/components/DayTabs'
import { ProjectsFilters } from './features/projects/components/ProjectsFilters'
import { ProjectsFooterNav } from './features/projects/components/ProjectsFooterNav'
import { ProjectsHeader } from './features/projects/components/ProjectsHeader'
import { buildId, days, defaultProjectForm } from './features/projects/model/constants'
import { indexedDbProjectsRepository } from './features/projects/model/repository'
import { parseDurationToSeconds } from './features/projects/model/time'
import type { ProjectFormState, Session, Theme } from './features/projects/model/types'
import { useProjectsStore } from './features/projects/model/useProjectsStore'
import { ProjectsList } from './features/projects/projectList'
import { StatsView } from './features/projects/stats'

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'light' ? 'light' : 'dark'
  })

  const { sessions, addSession, updateSession, hydrated } = useProjectsStore(indexedDbProjectsRepository)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [form, setForm] = useState<ProjectFormState>(defaultProjectForm)
  const [activeTab, setActiveTab] = useState<'projects' | 'stats'>('projects')

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
      elapsedSeconds: 0,
      totalSeconds: parseDurationToSeconds(form.duration),
      color: form.selectedColor,
      timerSettings: form.timerSettings,
      dailyLog: {},
    }

    addSession(nextSession)
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
          <ProjectsHeader
            theme={theme}
            onToggleTheme={toggleTheme}
            title={activeTab === 'stats' ? 'Stats overview' : 'All projects'}
          />
          {activeTab === 'projects' ? (
            <>
              <DayTabs days={days} />
              <ProjectsFilters count={sessions.length} />
            </>
          ) : null}
        </div>

        <div className="projects-scroll-area">
          {hydrated ? (
            activeTab === 'projects' ? (
              <ProjectsList sessions={sessions} onUpdateSession={updateSession} />
            ) : (
              <StatsView sessions={sessions} />
            )
          ) : (
            <article className="empty-state">Loading...</article>
          )}
        </div>

        <div className="dashboard-section dashboard-footer">
          <ProjectsFooterNav
            onCreate={() => setIsCreateOpen(true)}
            activeTab={activeTab}
            onNavigate={setActiveTab}
          />
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
