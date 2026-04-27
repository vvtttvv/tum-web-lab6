# Focus Flow - Lab 6 Front-end

Client-side Pomodoro dashboard built with React, TypeScript, Tailwind CSS, and custom CSS variables.

## Current Stage

Initial project skeleton with:
- Vite + React + TypeScript setup
- Tailwind integrated through the Vite plugin
- custom dark/light themes via CSS variables
- static dashboard layout inspired by the provided mockup
- theme persistence in localStorage

## Topic

Pomodoro productivity app for planning and tracking focus sessions.

## Planned Entities

- Session (title, elapsed, total duration, progress)
- Day plan (date + list of sessions)
- Filter state (All, Due, Completed)

## Main Flows

1. User opens the app and sees today's sessions.
2. User switches theme between dark and light.
3. User filters sessions by status.
4. Next iterations: start/pause/reset timer and track progress live.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- CSS variables for theming

## Local Run

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```
