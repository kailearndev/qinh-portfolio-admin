import type { IProject } from "./project";

export interface IJob {
  id: string;
  slug: string;
  job_thumbnail: string;
  title: string;
  summary: string;
  projects?: IProject[];
}
