import { supabase } from "@/lib/supbase";
import type { IJob } from "@/types/job";

const getJobs = async () => {
  // Simulate an API call

  const { data, error } = await supabase
    .from("jobs")
    .select("*, projects(*)", { count: "exact" })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
};

const updateJob = async (job: IJob) => {
  const payload = {
    title: job.title,
    summary: job.summary,
    id: job.id,
    job_thumbnail: job.job_thumbnail,
    // user_id KHÔNG update trừ khi bạn muốn update owner
  };

  const { error } = await supabase
    .from("jobs")
    .update(payload)
    .eq("id", job.id)
    .select();

  if (error) throw error;
  return {
    status: "success",
    data: true,
  };
};
const createJob = async (job: Omit<IJob, "id">) => {
  const payload = {
    title: job.title,
    summary: job.summary,
    job_thumbnail: job.job_thumbnail,
  };

  const { error } = await supabase.from("jobs").insert(payload).select();

  if (error) throw error;
  return {
    status: "success",
    data: true,
  };
};
const deleteJobs = async (ids: string[]) => {
  const { error } = await supabase.from("jobs").delete().in("id", ids);

  if (error) throw error;
  return {
    status: "success",
    data: true,
  };
};
export const JobService = {
  getJobs,
  updateJob,
  createJob,
  deleteJobs,
};
