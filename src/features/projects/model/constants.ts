import type { Day, ProjectFormState } from './types'

export const days: Day[] = [
  { label: 'Fri', date: '27' },
  { label: 'Sat', date: '28' },
  { label: 'Sun', date: '29' },
  { label: 'Mon', date: '30' },
  { label: 'Tue', date: '31' },
  { label: 'Wed', date: '1', active: true },
]

export const durationOptions = ['25m', '45m', '1h 00m', '1h 30m', '2h 00m', '3h 00m']

export const colorOptions = [
  '#ff4d57',
  '#ff7f1f',
  '#ffb114',
  '#91d722',
  '#37d05d',
  '#20c7a5',
  '#1ec8bc',
  '#1eaedb',
  '#1f8fe2',
  '#3e7bea',
  '#6070f0',
  '#8563eb',
  '#a35af0',
  '#c14de2',
  '#df449f',
  '#ff4464',
  '#b09362',
  '#748ea0',
]

export const defaultProjectForm: ProjectFormState = {
  projectName: '',
  duration: '1h 00m',
  frequency: 'repeating',
  period: 'daily',
  selectedColor: '#1ec8bc',
}

export const buildId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
