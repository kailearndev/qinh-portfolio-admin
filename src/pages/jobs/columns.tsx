"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import type { IJob } from "@/types/job";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Link } from "@tanstack/react-router";
import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IJob>[] = [
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
    accessorKey: "description",
    header: "Description",

    cell: ({ row }) => (
      <Tooltip>
        <TooltipTrigger>
          <span className="underline cursor-pointer">View Description</span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{row.original.summary}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
  {
    accessorKey: "projects",
    header: "Total Projects",
    cell: ({ row }) => <span>{row?.original?.projects?.length}</span>,
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
        to={row.original.job_thumbnail}
      >
        Thumnail Preview
      </Link>
    ),
  },
];
