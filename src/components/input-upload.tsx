import { uploadImage } from "@/services/upload";
import { Link } from "@tanstack/react-router";
import { Link2, Trash } from "lucide-react";
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
};

const InputUpload = ({
  accept,
  id,
  multiple,
  name,
  onChange,
  url,
  onDelete,
}: InputUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(url || "");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    onChange?.(selected.name);
  };

  const clearFile = () => {
    setFile(null);
    onDelete?.();
    setValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadImage(file);
      if (url) {
        toast.success("Upload successful!");
        onChange?.(url);
        setValue(url);
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
        {value ? (
          <div className="flex gap-2">
            <Input
              id={id}
              name={name}
              value={value}
              readOnly
              className="w-full pr-8"
            />
          </div>
        ) : (
          <Input
            name={name}
            ref={inputRef}
            id={id}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            onClick={(e) => e.stopPropagation()}
            className="px-2 pr-8"
          />
        )}
        {(file || value) && (
          <Trash
            size={16}
            className="absolute right-2 top-0 bottom-0 my-auto cursor-pointer text-muted-foreground hover:text-red-500"
            onClick={clearFile}
          />
        )}
      </div>
      {value && (
        <Link
          to={value}
          target="_blank"
          rel="noopener noreferrer"
          className=" items-center px-3 py-2"
        >
          <Link2 />
        </Link>
      )}
      <Button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || !file}
      >
        {isUploading ? <Spinner /> : "Upload"}
      </Button>
    </div>
  );
};

export default InputUpload;
