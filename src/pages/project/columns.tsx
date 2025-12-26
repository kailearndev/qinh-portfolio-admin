import { Checkbox } from "@/components/ui/checkbox";
import type { IProject } from "@/types/project";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IProject>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
      />
    ),
  },

  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "short_detail",
    header: "Short Detail",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },

  {
    accessorKey: "thumnail_url",
    header: "Thumnail",

    cell: ({ row }) => (
      <Link
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        to={row.original.thumnail_url}
      >
        Thumnail Preview
      </Link>
    ),
  },
];
