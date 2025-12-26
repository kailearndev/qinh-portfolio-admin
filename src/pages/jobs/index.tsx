import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { JobService } from "@/services/jobs";
import type { IJob } from "@/types/job";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RowSelectionState } from "@tanstack/react-table";
import { CirclePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";
import ExperienceDetail from "./components/detail";
import AddExperienceNew from "./components/new";

export default function Jobs() {
  const query = useQueryClient();
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedJob, setSelectedJob] = useState<IJob | undefined>(undefined);
  const { data, isLoading } = useQuery({
    queryFn: () => JobService.getJobs(),
    queryKey: ["jobs-data"],
  });

  const handleOpenDetail = (data: IJob) => {
    setSelectedJob(data);
    setOpenDetail(true);
  };

  const handleDeleteJobs = async () => {
    const rowIds = Object.keys(rowSelection);
    const res = await JobService.deleteJobs(rowIds);
    if (res.status === "success") {
      setRowSelection({});
      await query.invalidateQueries({ queryKey: ["jobs-data"] });
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
        <h1 className="text-2xl font-bold">Jobs</h1>
        <p className="text-muted-foreground">Manage jobs information</p>
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
          onClick={handleDeleteJobs}
          variant={"destructive"}
          disabled={Object.keys(rowSelection).length === 0}
        >
          <Trash2 /> Delete
        </Button>
      </div>
      <code className="text-sm text-muted-foreground ">
        Double click on a row to see more details and edit jobs
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
        data={selectedJob}
      />
      <AddExperienceNew open={openNew} onOpenChange={setOpenNew} />
    </section>
  );
}
