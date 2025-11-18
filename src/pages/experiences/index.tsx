import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ExperienceService } from "@/services/experience";
import type { IExperience } from "@/types/experience";
import { useQuery } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";
import { CirclePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import ExperienceDetail from "./components/detail";

export default function Experiences() {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedExperience, setSelectedExperience] = useState<
    IExperience | undefined
  >(undefined);
  const { data, isLoading } = useQuery({
    queryFn: () => ExperienceService.getExperience(),
    queryKey: ["experience-data"],
  });

  const handleOpenDetail = (data: IExperience, state: boolean) => {
    setSelectedExperience(data);
    setOpenDetail(state);
  };
  if (isLoading)
    return <div className="flex justify-center items-center">Loading...</div>;
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Experiences</h1>
        <p className="text-muted-foreground">Manage experiences information</p>
      </div>
      <div id="action" className="flex justify-end items-center gap-4">
        <Button className="bg-blue-600" variant={"outline"}>
          <CirclePlus /> Add New
        </Button>
        <Button
          variant={"destructive"}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 /> Delete
        </Button>
      </div>

      <DataTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        loading={isLoading}
        onRowClick={(row) => {
          handleOpenDetail(row, true);
        }}
        columns={columns}
        data={data || []}
      />
      <ExperienceDetail
        open={openDetail}
        onOpenChange={setOpenDetail}
        data={selectedExperience}
      />
    </section>
  );
}
