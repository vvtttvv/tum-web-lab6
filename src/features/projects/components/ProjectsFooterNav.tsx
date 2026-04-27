type ProjectsFooterNavProps = {
  onCreate: () => void
}

export function ProjectsFooterNav({ onCreate }: ProjectsFooterNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button type="button" className="nav-link active">Projects</button>
      <button type="button" className="nav-link">Sessions</button>
      <button type="button" className="center-fab" aria-label="Create project" onClick={onCreate}>
        +
      </button>
      <button type="button" className="nav-link">Tasks</button>
      <button type="button" className="nav-link">Stats</button>
    </nav>
  )
}
