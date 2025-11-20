import { supabase } from "@/lib/supbase";
import type { ProjectDTO } from "@/types/project";

const getProject = async () => {
  // Simulate an API call

  const { data, error } = await supabase.from("projects").select("*").order('created_at', { ascending: true });

  if (error) throw error;
  return data
}

const updateProject = async (exp: ProjectDTO) => {
  
  
const { error } = await supabase
  .from('projects')
  .update(exp)
  .eq('id', exp.id)
  .select()
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
const createProject = async (exp: Omit<ProjectDTO, "id">) => {
  

  
const { error } = await supabase
  .from('projects')
  .insert(exp)
  .select()
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
const deleteProjects = async (ids: string[]) => {
  const { error } = await supabase
    .from('Projects')
    .delete()
    .in('id', ids)
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
export const ProjectService = {
  getProject,
  updateProject,
  createProject,
  deleteProjects
}