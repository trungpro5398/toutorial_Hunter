export type ProjectStatus = "ready" | "planned";

export type Project = {
  id: string;
  title: string;
  slug: string;
  folder: string;
  status: ProjectStatus;
  focus: string;
  description: string;
};
