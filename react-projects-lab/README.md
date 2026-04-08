# React Projects Lab

React website for managing 10 small web projects. The home page shows project tiles that link to each project workspace, starting with a Snake Game exercise for practicing `useState` and `useEffect`.

## Run the Project

```bash
npm install
npm run dev
```

## Main Structure

```text
src/
  app/                 App root and routing
  components/          Shared UI components
  config/              Project list metadata
  features/            Feature folders by screen
  layouts/             Shared layouts
  pages/               Route-level pages
  projects/            10 isolated project folders
  styles/              Global CSS
  types/               Shared TypeScript types
  utils/               Shared helpers
```

## Small Project Rules

- Each project lives in `src/projects/<number>-<slug>/`.
- Planned projects still need a `README.md` with clear requirements.
- Built projects should use `components`, `hooks`, `constants`, `types`, and `utils` when the logic starts growing.
- Do not put game or app logic directly inside render code when it can be moved into a hook or helper.

## Beginner Screen Pattern

Each project page should stay easy to read:

```tsx
import { ProjectForm } from "./components/ProjectForm";
import { ProjectList } from "./components/ProjectList";

export function ProjectPage() {
  return (
    <section className="exercise-page">
      <h1>Project Name</h1>
      <p>Read the README first. Then build the screen with small components.</p>

      <div className="starter-surface">
        <ProjectForm />
        <ProjectList />
      </div>
    </section>
  );
}
```

- Requirements live in each project `README.md`, not in the React screen.
- The page file is the main screen.
- `components/` contains simple starter UI blocks that the page imports and combines.
- Add hooks, utils, constants, and types only when the project actually needs them.
