import { DataTable } from "@/components/data-table";
import { ExperienceService } from "@/services/experience";
import { useQuery } from "@tanstack/react-query";
import * as z from "zod";
import { columns } from "./columns";

const formSchema = z.object({
    id: z.string(),
    name: z
        .string(),
    avatar_url: z
        .string(),
    positions: z
        .string(),
    phone: z
        .string(),
    email: z
        .string(),
    tiktok: z
        .string(),
    facebook: z
        .string(),
    address: z
        .string(),
    website: z
        .string(),



})
export default function Experiences() {
    const { data, isLoading } = useQuery({
        queryFn: () => ExperienceService.getExperience(),
        queryKey: ["experience-data"],

    });



    if (isLoading) return <div className="flex justify-center items-center">Loading...</div>;
    return (
        <DataTable columns={columns} data={data || []} />
    );
}
