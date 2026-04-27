import type { FormEvent } from 'react'
import { colorOptions, durationOptions } from '../model/constants'
import type { ProjectFormState } from '../model/types'

type CreateProjectModalProps = {
  open: boolean
  form: ProjectFormState
  onChange: (patch: Partial<ProjectFormState>) => void
  onClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function CreateProjectModal({ open, form, onChange, onClose, onSubmit }: CreateProjectModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="create-overlay" role="dialog" aria-modal="true" aria-labelledby="create-title">
      <form className="create-modal" onSubmit={onSubmit}>
        <header className="create-header">
          <h2 id="create-title" className="create-title">New project</h2>
          <button type="button" className="close-btn" aria-label="Close form" onClick={onClose}>
            ×
          </button>
        </header>

        <input
          value={form.projectName}
          onChange={(event) => onChange({ projectName: event.target.value })}
          className="field-input"
          placeholder="Project name"
          maxLength={48}
          required
        />

        <section className="form-card">
          <div className="form-row with-toggle">
            <div>
              <p className="form-title">Time Goal</p>
              <p className="form-hint">Plan your focus block</p>
            </div>
            <div className="check-pill">✓</div>
          </div>

          <label className="field-label" htmlFor="duration-select">Duration</label>
          <select
            id="duration-select"
            className="field-select"
            value={form.duration}
            onChange={(event) => onChange({ duration: event.target.value })}
          >
            {durationOptions.map((value) => (
              <option value={value} key={value}>{value}</option>
            ))}
          </select>

          <p className="field-label mt-4">Frequency</p>
          <div className="choice-grid two">
            <button
              type="button"
              className={`choice-item${form.frequency === 'repeating' ? ' active' : ''}`}
              onClick={() => onChange({ frequency: 'repeating' })}
            >
              Repeating
            </button>
            <button
              type="button"
              className={`choice-item${form.frequency === 'one-time' ? ' active' : ''}`}
              onClick={() => onChange({ frequency: 'one-time' })}
            >
              One Time
            </button>
          </div>

          <div className="choice-grid three mt-3">
            <button
              type="button"
              className={`choice-item${form.period === 'daily' ? ' active' : ''}`}
              onClick={() => onChange({ period: 'daily' })}
            >
              Daily
            </button>
            <button
              type="button"
              className={`choice-item${form.period === 'weekly' ? ' active' : ''}`}
              onClick={() => onChange({ period: 'weekly' })}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`choice-item${form.period === 'monthly' ? ' active' : ''}`}
              onClick={() => onChange({ period: 'monthly' })}
            >
              Monthly
            </button>
          </div>
        </section>

        <section className="form-card compact">
          <div className="form-row">
            <div>
              <p className="form-title">Timer settings</p>
              <p className="form-hint">Countdown • 25/5/10 | 3</p>
            </div>
            <span className="timer-chevron">⌄</span>
          </div>
        </section>

        <section className="form-card compact">
          <div className="color-grid">
            {colorOptions.map((color) => (
              <button
                type="button"
                key={color}
                className={`color-swatch${form.selectedColor === color ? ' active' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
                onClick={() => onChange({ selectedColor: color })}
              >
                {form.selectedColor === color ? '✓' : ''}
              </button>
            ))}
          </div>
        </section>

        <button className="save-btn" type="submit">Save</button>
      </form>
    </div>
  )
}
