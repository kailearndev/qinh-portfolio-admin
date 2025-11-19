import { supabase } from "@/lib/supbase";
import type { IExperience } from "@/types/experience";

const getExperience = async () => {
  // Simulate an API call

  const { data, error } = await supabase.from("experiences").select("*").order('created_at', { ascending: true });

  if (error) throw error;
  return data
}

const updateExperience = async (exp: IExperience) => {
  const payload = {
    company: exp.company,
    position: exp.position,
    duration: exp.duration,
    description: exp.description,
    id: exp.id,
    is_public: exp.is_public,
    // user_id KHÔNG update trừ khi bạn muốn update owner
  };

  
const { error } = await supabase
  .from('experiences')
  .update(payload)
  .eq('id', exp.id)
  .select()
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
const createExperience = async (exp: Omit<IExperience, "id" | "about_id"| "user_id">) => {
  const payload = {
    company: exp.company,
    position: exp.position,
    duration: exp.duration,
    description: exp.description,
    is_public: exp.is_public,
    
  };

  
const { error } = await supabase
  .from('experiences')
  .insert(payload)
  .select()
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
const deleteExperiences = async (ids: string[]) => {
  const { error } = await supabase
    .from('experiences')
    .delete()
    .in('id', ids)
  
  if (error) throw error;
  return {
    "status": "success",
    "data": true
  }
}
export const ExperienceService = {
  getExperience,
  updateExperience,
  createExperience,
  deleteExperiences
}