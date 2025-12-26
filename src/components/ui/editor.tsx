import { uploadImage } from "@/services/upload";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type EditorProps = {
  data?: string;

  onChange?: (data: string) => void;
};

export default function Editor({ data, onChange }: EditorProps) {
  const imageHandler = function (this: any) {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // ===== Kai upload lên Supabase/PB/API ở đây =====
      const url = await uploadImage(file);

      const range = this.quill.getSelection();
      this.quill.insertEmbed(range.index, "image", url);
    };
  };

  return (
    <ReactQuill
      theme="snow"
      value={data}
      style={{
        height: "calc(100svh - 470px)",
      }}
      onChange={onChange}
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler, // 👈 CHỈ ĐÚNG NHƯ VẦY
          },
        },
        clipboard: { matchVisual: false },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",

        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}
    />
  );
}
