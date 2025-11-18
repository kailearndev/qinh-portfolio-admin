import { supabase } from "@/lib/supbase";
import type { IHome } from "@/types/home";

const getHome = async () => {
  // Simulate an API call


  const { data, error } = await supabase
    .from("users")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}
const updateHome = async (homeData: IHome) => {
  const { data, error } = await supabase
    .from("users")
    .update(homeData)
    .eq("id", homeData.id);
  if (error) throw error;
  return data;
}

export const HomeService = {
  getHome,
  updateHome
}