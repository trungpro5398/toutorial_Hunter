import { Link } from "react-router-dom";
import type { Project } from "../../types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link className="project-card" to={`/projects/${project.slug}`}>
      <span className="project-number">{project.id}</span>
      <span className={`project-status ${project.status}`}>
        {project.status === "ready" ? "Ready" : "Planned"}
      </span>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <span className="project-focus">{project.focus}</span>
    </Link>
  );
}
