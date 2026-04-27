import type { Theme } from '../model/types'

type ProjectsHeaderProps = {
  theme: Theme
  onToggleTheme: () => void
}

export function ProjectsHeader({ theme, onToggleTheme }: ProjectsHeaderProps) {
  return (
    <header className="projects-header">
      <h1 className="projects-title">All projects</h1>

      <div className="header-actions">
        <button className="icon-btn" aria-label="Menu" type="button">
          <span className="icon-line"></span>
          <span className="icon-line"></span>
          <span className="icon-line short"></span>
        </button>
        <button
          className="theme-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </header>
  )
}
