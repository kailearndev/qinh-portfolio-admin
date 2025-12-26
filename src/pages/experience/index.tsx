import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ExperienceService } from "@/services/experience";
import type { IExperience } from "@/types/experience";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";
import { CirclePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import ExperienceDetail from "./components/detail";
import AddExperienceNew from "./components/new";

export default function Experiences() {
  const query = useQueryClient();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedExperience, setSelectedExperience] = useState<
    IExperience | undefined
  >(undefined);
  const { data, isLoading } = useQuery({
    queryFn: () => ExperienceService.getExperience(),
    queryKey: ["experience-data"],
  });

  const handleOpenDetail = (data: IExperience) => {
    setSelectedExperience(data);
    setOpenDetail(true);
  };

  const handleDeleteExperiences = async () => {
    const rowIds = Object.keys(rowSelection);
    const res = await ExperienceService.deleteExperiences(rowIds);
    if (res.status === "success") {
      setRowSelection({});
      await query.invalidateQueries({ queryKey: ["experience-data"] });
    }

    // Implement delete functionality here
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner className="h-10 w-10" />
      </div>
    );
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Experiences</h1>
        <p className="text-muted-foreground">Manage experiences information</p>
      </div>
      <div id="action" className="flex justify-end items-center gap-4">
        <Button
          onClick={() => setOpenNew(true)}
          className="bg-blue-600"
          variant={"outline"}
        >
          <CirclePlus /> Add New
        </Button>
        <Button
          onClick={handleDeleteExperiences}
          variant={"destructive"}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 /> Delete
        </Button>
      </div>
      <code className="text-sm text-muted-foreground ">
        Double click on a row to see more details and edit experience
      </code>
      <DataTable
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        loading={isLoading}
        onRowClick={(row) => handleOpenDetail(row)}
        columns={columns}
        data={data || []}
      />

      <ExperienceDetail
        open={openDetail}
        onOpenChange={setOpenDetail}
        data={selectedExperience}
      />
      <AddExperienceNew open={openNew} onOpenChange={setOpenNew} />
    </section>
  );
}
