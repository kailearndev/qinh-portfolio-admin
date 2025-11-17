import { DataTable } from "@/components/data-table";
import { AboutService } from "@/services/about";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { columns } from "./columns";

export default function About() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["about-page"],
    queryFn: () => AboutService.list({ page: 1, perPage: 10 }),
  });

  return (
    <div className="flex flex-col gap-4">
      Basic Information
      <DataTable
        onRowClick={(id) => navigate({ to: `/basic-infomation/${id.id}` })}
        loading={isLoading}
        columns={columns}
        data={data?.items ?? []}
      />
    </div>
  );
}
