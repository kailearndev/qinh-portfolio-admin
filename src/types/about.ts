import type { WorkExperience } from "./work-experience";

export interface About {
  id: string;
  collectionId: string;
  collectionName: "about";
  email: string;
  address: string;
  phone: string;
  url: string;
  experience: number;
  client_worked: number;
  field: string;
  cv_upload: string;
  created?: string;
  updated?: string;
  work_experience: string[];
  expand?: {
    work_experience?: WorkExperience[];
  };
}

export interface AboutDTO {
  email: string;
  address: string;
  phone: string;
  experience: number;
  client_worked: number;
  id: string;
  cv_upload: string;
  field: string;
  url: string;
  work_experience: string[];
}
