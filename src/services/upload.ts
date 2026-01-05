import { supabase } from "@/lib/supbase";

export async function uploadImage(file?: File, path?: string): Promise<string> {
  if (!file) throw new Error("No file provided");
  const fileExt = file.name.split(".").pop();
  const filePath = `${path ?? "images"}/${Date.now()}.${fileExt}`;

  // Upload file
  const { error } = await supabase.storage
    .from(path ?? "images")
    .upload(filePath, file);

  if (error) throw error;

  // Lấy public URL
  const { data: images } = supabase.storage
    .from(path ?? "images")
    .getPublicUrl(filePath);

  return images.publicUrl;
}
