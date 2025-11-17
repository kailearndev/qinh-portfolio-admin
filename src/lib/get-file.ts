type Record = {
  collectionName: string;
  id: string;
  fileName: string;
};
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8090/api";
export const getFile = (record: Record): string => {
  return `${BASE_URL}/files/${record.collectionName}/${record.id}/${record.fileName}`;
};
