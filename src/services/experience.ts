import { supabase } from "@/lib/supbase";
import type { IHome } from "@/types/home";

const getExperience = async () => {
  // Simulate an API call


  const { data, error } = await supabase.from("experiences").select("*")



  if (error) throw error;
  return data
}
const updateExperience = async (experienceData: IHome) => {
  const { data, error } = await supabase
    .from("users")
    .update(experienceData)
    .eq("id", experienceData.id);
  if (error) throw error;
  return data;
}

export const ExperienceService = {
  getExperience,
  updateExperience
}