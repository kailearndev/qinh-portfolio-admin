import { supabase } from "@/lib/supbase";
import type { IAbout } from "@/types/about";

const getAbout = async () => {
  const { data, error } = await supabase.from("about").select("*, users(*)").single();
  if (error) {
    throw new Error(error.message);
  }
  return data
}
const updateAbout = async (aboutPayload: IAbout) => {
  const { data, error } = await supabase
    .from("about")
    .update(aboutPayload)
    .eq("id", aboutPayload.id);
  if (error) throw error;
  return data;
}
export const AboutService = {
  getAbout,
  updateAbout
};
