"use client";

import { uploadImage } from "@/services/upload";
import { FileText, Link2, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

type InputUploadProps = {
  accept?: string;
  id?: string;
  multiple?: boolean;
  name: string;
  url?: string;
  onChange?: (value: string) => void;
  onDelete?: () => void;
  path?: string;
};

const InputUpload = ({
  accept,
  id,
  multiple,
  name,
  onChange,
  url,
  onDelete,
  path = "images",
}: InputUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Trạng thái file cục bộ khi vừa chọn (chưa upload)
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Xử lý khi chọn file từ máy tính
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
  };

  // Xóa sạch trạng thái (cả file đang chọn và link đã có)
  const clearFile = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
    onDelete?.(); // Báo cho React Hook Form biết giá trị giờ là rỗng
    onChange?.("");
  };

  // Xử lý Upload lên Server
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file, path);
      if (uploadedUrl) {
        toast.success("Upload successful!");
        onChange?.(uploadedUrl); // Cập nhật URL vào Form
        setFile(null); // Upload xong thì xóa file tạm
      }
    } catch (err) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex w-full max-w-md items-center gap-2">
      <div className="relative w-full">
        {url ? (
          /* TRƯỜNG HỢP 1: ĐÃ CÓ URL (Từ server hoặc sau khi upload) */
          <div className="flex items-center relative">
            <Input
              id={id}
              name={name}
              value={url}
              readOnly
              className="w-full pr-10 bg-muted/50"
            />
            <Trash
              size={16}
              className="absolute right-3 cursor-pointer text-muted-foreground hover:text-red-500 transition-colors"
              onClick={clearFile}
            />
          </div>
        ) : file ? (
          /* TRƯỜNG HỢP 2: ĐANG CHỌN FILE TẠM (Chờ bấm nút Upload) */
          <div className="flex items-center justify-between px-3 py-2 border rounded-md bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText size={16} className="text-blue-500 flex-shrink-0" />
              <span className="text-sm truncate font-medium text-blue-700 dark:text-blue-300">
                {file.name}
              </span>
            </div>
            <Trash
              size={16}
              className="cursor-pointer text-blue-400 hover:text-red-500 ml-2"
              onClick={clearFile}
            />
          </div>
        ) : (
          /* TRƯỜNG HỢP 3: CHƯA CÓ GÌ - HIỂN THỊ Ô CHỌN FILE */
          <Input
            name={name}
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="px-2"
          />
        )}
      </div>

      {/* Nút xem link trực tiếp */}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 rounded-md border hover:bg-accent transition-colors"
          title="View document"
        >
          <Link2 size={20} />
        </a>
      )}

      {/* Nút bấm thực hiện upload (Chỉ hiện khi có file tạm) */}
      {!url && file && (
        <Button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="min-w-[80px]"
        >
          {isUploading ? <Spinner className="h-4 w-4" /> : "Upload"}
        </Button>
      )}
    </div>
  );
};

export default InputUpload;
