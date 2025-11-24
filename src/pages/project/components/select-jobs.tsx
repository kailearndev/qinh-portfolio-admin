import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { JobService } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";

type SelectJobsProps = {
  name: string;
  onChange: (value: string) => void;
  value?: string;
};
const SelectJobs = ({ name, onChange, value }: SelectJobsProps) => {
  const { data, isLoading } = useQuery({
    queryFn: () => JobService.getJobs(),
    queryKey: ["jobs-data"],
    select: (data) =>
      data.map((job) => ({
        label: job.title,
        value: job.id,
      })),
  });

  return (
    <Select name={name} onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        {isLoading ? <Spinner /> : <SelectValue placeholder="Select a job" />}
      </SelectTrigger>
      <SelectContent>
        {data?.map((job) => (
          <SelectItem key={job.value} value={job.value}>
            {job.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectJobs;
