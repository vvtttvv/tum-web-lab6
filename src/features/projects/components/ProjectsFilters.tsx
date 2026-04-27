type ProjectsFiltersProps = {
  count: number
}

export function ProjectsFilters({ count }: ProjectsFiltersProps) {
  return (
    <div className="filters-row">
      <div className="filters-group">
        <span className="filter-label">Filter</span>
        <button className="chip" type="button">
          All ({count})
        </button>
        <button className="chip" type="button">
          Due ({count})
        </button>
      </div>

      <div className="remaining-box">
        <span className="remaining-label">Remaining</span>
        <strong className="remaining-value">5h 56m</strong>
      </div>
    </div>
  )
}
