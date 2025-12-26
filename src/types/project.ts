export interface IProject {
  id: string;
  thumnail_url: string;
  title: string;
  slug: string;
  short_detail: string;
  created_at?: string;
  detail: string;
  job_id: string;
}

export interface ProjectDTO extends IProject {}
