import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ProjectService } from "@/services/project";
import type { IProject } from "@/types/project";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";
import { CirclePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import ExperienceDetail from "./components/detail";
import AddExperienceNew from "./components/new";

export default function Project() {
  const query = useQueryClient();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedProject, setSelectedProject] = useState<IProject | undefined>(
    undefined
  );
  const { data, isLoading } = useQuery({
    queryFn: () => ProjectService.getProject(),
    queryKey: ["projects-data"],
  });

  const handleOpenDetail = (data: IProject) => {
    setSelectedProject(data);
    setOpenDetail(true);
  };

  const handleDeleteProjects = async () => {
    const rowIds = Object.keys(rowSelection);
    const res = await ProjectService.deleteProjects(rowIds);
    if (res.status === "success") {
      setRowSelection({});
      await query.invalidateQueries({ queryKey: ["projects-data"] });
    }

    // Implement delete functionality here
  };
  if (isLoading)
    return <div className="flex justify-center items-center">Loading...</div>;
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground">Manage projects information</p>
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
          onClick={handleDeleteProjects}
          variant={"destructive"}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 /> Delete
        </Button>
      </div>
      <code className="text-sm  rotate-2 text-cyan-50">
        Click row to view details
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
        data={selectedProject}
      />
      <AddExperienceNew open={openNew} onOpenChange={setOpenNew} />
    </section>
  );
}
