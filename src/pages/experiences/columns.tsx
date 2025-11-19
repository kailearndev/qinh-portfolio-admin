"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import type { IExperience } from "@/types/experience";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IExperience>[] = [
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
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "position",
    header: "Position",
  },
  {
    accessorKey: "is_public",
    header: "Public",
    cell: ({ row }) => (
      <Switch
        onClick={(e) => e.stopPropagation()}
        checked={row.original.is_public}
      />
    ),
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
          <p className="max-w-xs">{row.original.description}</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
];
