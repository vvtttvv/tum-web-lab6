export type Theme = 'light' | 'dark'

export type Day = {
  label: string
  date: string
  active?: boolean
}

export type Session = {
  id: string
  title: string
  elapsed: string
  total: string
  color: string
}

export type Frequency = 'repeating' | 'one-time'
export type Period = 'daily' | 'weekly' | 'monthly'

export type ProjectFormState = {
  projectName: string
  duration: string
  frequency: Frequency
  period: Period
  selectedColor: string
}
