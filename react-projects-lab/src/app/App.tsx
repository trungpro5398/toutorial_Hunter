import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { ComingSoonPage } from "../pages/ComingSoonPage";
import { ProjectHubPage } from "../pages/ProjectHubPage";
import { SnakeGamePage } from "../projects/01-snake-game/SnakeGamePage";
import { MemoryCardsPage } from "../projects/02-memory-cards/MemoryCardsPage";
import { TodoPlannerPage } from "../projects/03-todo-planner/TodoPlannerPage";
import { WeatherBoardPage } from "../projects/04-weather-board/WeatherBoardPage";
import { ExpenseTrackerPage } from "../projects/05-expense-tracker/ExpenseTrackerPage";
import { QuizArenaPage } from "../projects/06-quiz-arena/QuizArenaPage";
import { RecipeFinderPage } from "../projects/07-recipe-finder/RecipeFinderPage";
import { NotesBoardPage } from "../projects/08-notes-board/NotesBoardPage";
import { MovieSearchPage } from "../projects/09-movie-search/MovieSearchPage";
import { PomodoroFocusPage } from "../projects/10-pomodoro-focus/PomodoroFocusPage";

export function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<ProjectHubPage />} />
        <Route path="projects/snake-game" element={<SnakeGamePage />} />
        <Route path="projects/memory-cards" element={<MemoryCardsPage />} />
        <Route path="projects/todo-planner" element={<TodoPlannerPage />} />
        <Route path="projects/weather-board" element={<WeatherBoardPage />} />
        <Route path="projects/expense-tracker" element={<ExpenseTrackerPage />} />
        <Route path="projects/quiz-arena" element={<QuizArenaPage />} />
        <Route path="projects/recipe-finder" element={<RecipeFinderPage />} />
        <Route path="projects/notes-board" element={<NotesBoardPage />} />
        <Route path="projects/movie-search" element={<MovieSearchPage />} />
        <Route path="projects/pomodoro-focus" element={<PomodoroFocusPage />} />
        <Route path="projects/:slug" element={<ComingSoonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
