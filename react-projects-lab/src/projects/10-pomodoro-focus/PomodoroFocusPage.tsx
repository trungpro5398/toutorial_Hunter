import { Link } from "react-router-dom";
import { ModeSelector } from "./components/ModeSelector";
import { TimerControls } from "./components/TimerControls";
import { TimerDisplay } from "./components/TimerDisplay";

export function PomodoroFocusPage() {
  return (
    <section className="exercise-page" aria-labelledby="pomodoro-focus-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 10 · timers</p>
          <h1 id="pomodoro-focus-title">Pomodoro Focus</h1>
          <p>
            Read the requirements in the README. Build this screen from timer,
            controls, and mode selector components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <TimerDisplay />
        <TimerControls />
        <ModeSelector />
      </div>
    </section>
  );
}
