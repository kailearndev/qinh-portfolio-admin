import { getFile } from "@/lib/get-file";
import type { IBasicInfomation } from "@/types/basic-infomation";

export default function BasicInfomation({
  data,
}: {
  data: IBasicInfomation | undefined;
}) {
  console.log(data);
  const file = getFile({
    id: data?.id || "",
    fileName: data?.avatar || "example.txt",
    collectionName: data?.collectionName || "basic-infomation",
  });
  return (
    <div>
      Basic Infomation Page
      <pre>{JSON.stringify(data, null, 2)}</pre>
      file download test:
      <img src={file} alt="Download example.txt" className="h-80 w-80" />
    </div>
  );
}
