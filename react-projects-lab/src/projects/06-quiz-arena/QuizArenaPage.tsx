import { Link } from "react-router-dom";
import { AnswerList } from "./components/AnswerList";
import { QuestionPanel } from "./components/QuestionPanel";
import { QuizResult } from "./components/QuizResult";

export function QuizArenaPage() {
  return (
    <section className="exercise-page" aria-labelledby="quiz-arena-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 06 · step state</p>
          <h1 id="quiz-arena-title">Quiz Arena</h1>
          <p>
            Read the requirements in the README. Build this screen from
            question, answer, and result components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <QuestionPanel />
        <AnswerList />
        <QuizResult />
      </div>
    </section>
  );
}
