import { supabase } from "@/lib/supbase";

export async function uploadImage(file?: File) {
  if (!file) throw new Error("No file provided");
  const fileExt = file.name.split(".").pop();
  const filePath = `images/${Date.now()}.${fileExt}`;

  // Upload file
  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (error) throw error;

  // Lấy public URL
  const { data: images } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return images.publicUrl;
}
