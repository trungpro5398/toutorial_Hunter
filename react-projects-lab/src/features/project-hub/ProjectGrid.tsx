import { projects } from "../../config/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  return (
    <div className="project-grid" aria-label="Project list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
