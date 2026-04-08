import { Link } from "react-router-dom";
import { SnakeBoard } from "./components/SnakeBoard";
import { SnakeControls } from "./components/SnakeControls";
import "./styles/snakeGame.css";

export function SnakeGamePage() {
  return (
    <section className="exercise-page" aria-labelledby="snake-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 01 · useState + useEffect</p>
          <h1 id="snake-title">Snake Game</h1>
          <p>
            Read the requirements in this project README first. Then implement
            the screen by combining simple components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <SnakeBoard />
        <SnakeControls />
      </div>
    </section>
  );
}
