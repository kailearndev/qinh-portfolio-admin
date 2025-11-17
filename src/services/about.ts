import { pb } from "@/lib/pocketbast";
import type { About, AboutDTO } from "@/types/about";

export const AboutService = {
  async list(filers?: Record<string, number>) {
    await pb
      .collection("about")
      .getList(filers?.page ?? 1, filers?.perPage ?? 10, {
        expand: "work_experience", // sắp xếp mới nhất lên đầu
      });
  },
  async getOne(id: string): Promise<About> {
    return await pb.collection("about").getOne(id);
  },
  async create(data: any) {
    return await pb.collection("about").create(data);
  },
  async update(id: string, data: AboutDTO) {
    return await pb.collection("about").update(id, data);
  },
  async remove(id: string) {
    return await pb.collection("about").delete(id);
  },
};
