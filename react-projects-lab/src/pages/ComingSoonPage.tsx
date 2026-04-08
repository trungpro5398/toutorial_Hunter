import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../config/projects";

export function ComingSoonPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="detail-page">
        <p className="eyebrow">Not found</p>
        <h1>This project is not in the list.</h1>
        <Link className="button secondary" to="/">
          Back to projects
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page" aria-labelledby="project-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="project-detail-heading">
        <p className="eyebrow">Planned project {project.id}</p>
        <h1 id="project-title">{project.title}</h1>
        <p>{project.description}</p>
      </div>

      <div className="requirement-panel">
        <div>
          <span className="panel-label">Folder</span>
          <strong>{project.folder}</strong>
        </div>
        <div>
          <span className="panel-label">Focus</span>
          <strong>{project.focus}</strong>
        </div>
      </div>

      <section className="requirements-section" aria-labelledby="readme-title">
        <h2 id="readme-title">Read the README</h2>
        <p className="muted-copy">
          Requirements live in the project README so students can read the task
          before touching the code.
        </p>
      </section>
    </section>
  );
}
