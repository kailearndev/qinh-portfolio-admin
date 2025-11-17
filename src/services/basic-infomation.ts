import { pb } from "@/lib/pocketbast";
import type { About, AboutDTO } from "@/types/about";
import type { IBasicInfomation } from "@/types/basic-infomation";
import type { ApiResponse } from "@/types/response";

export const BasicInfomationService = {
  async list(): Promise<ApiResponse<IBasicInfomation[]>> {
    return await pb.collection("basic_infomation").getList(1, 1, {
      order: "-created",
      expand: "work_experience", // sắp xếp mới nhất lên đầu
    });
  },
  async getOne(id: string): Promise<About> {
    return await pb.collection("basic_infomation").getOne(id);
  },
  async create(data: any) {
    return await pb.collection("basic_infomation").create(data);
  },
  async update(id: string, data: AboutDTO) {
    return await pb.collection("basic_infomation").update(id, data);
  },
};
