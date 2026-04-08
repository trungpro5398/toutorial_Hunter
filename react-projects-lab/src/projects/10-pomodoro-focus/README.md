# Project 10 - Pomodoro Focus

## Goal

Build a Pomodoro timer to practice interval effects, cleanup, and mode transitions.

## Requirements

- Manage modes for work, short break, and long break.
- Manage remaining seconds, running state, and completed sessions.
- Use a `useEffect` interval and clean it up correctly when paused, reset, or unmounted.
- Include Start, Pause, Reset, and mode switch controls.
- Display progress based on remaining time.
- Split the timer display, controls, and mode selector.

## Suggested Structure

```text
10-pomodoro-focus/
  components/     TimerDisplay, TimerControls, ModeSelector
  constants/      mode durations, labels
  hooks/          usePomodoroTimer
  types/          TimerMode, TimerStatus
  utils/          formatTime, getProgress
```
