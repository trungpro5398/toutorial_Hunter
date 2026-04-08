import { ProjectGrid } from "../features/project-hub/ProjectGrid";

export function ProjectHubPage() {
  return (
    <section className="hub-page" aria-labelledby="hub-title">
      <div className="hub-intro">
        <p className="eyebrow">React learning workspace</p>
        <h1 id="hub-title">Choose a project and build step by step.</h1>
        <p>
          Each folder has its own requirements, route, and scope so the code
          stays readable as the number of projects grows.
        </p>
      </div>

      <ProjectGrid />
    </section>
  );
}
