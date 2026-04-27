import type { Session } from '../model/types'

type ProjectsListProps = {
  sessions: Session[]
}

export function ProjectsList({ sessions }: ProjectsListProps) {
  if (sessions.length === 0) {
    return (
      <article className="empty-state">
        <p className="empty-title">No projects yet</p>
        <p className="empty-subtitle">Tap the + button below to create your first focus session.</p>
      </article>
    )
  }

  return (
    <section className="space-y-4">
      {sessions.map((session) => (
        <article key={session.id} className="task-card">
          <div className="task-row">
            <button
              className="play-btn"
              aria-label="Start task"
              type="button"
              style={{ backgroundColor: session.color }}
            >
              ▶
            </button>

            <div className="task-content">
              <div className="task-header">
                <div>
                  <h2 className="task-title">{session.title}</h2>
                  <p className="task-subtitle">
                    {session.elapsed} / {session.total}
                  </p>
                </div>
                <span className="task-arrow">›</span>
              </div>

              <div className="task-progress-row">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <span className="task-percent">0%</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
