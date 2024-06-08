"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export type Connected = {
  id: string;
  message: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  name: string;
  leader: string;
  tribe: string;
};

const truncateMessage = (message: string, maxLength: number) => {
  if (!message) {
    return '';
  }
  return message.length > maxLength ? message.slice(0, maxLength) + '...' : message;
};

export const columns: ColumnDef<Connected>[] = [
  {
    id: "id",
    accessorKey: "id",
  },
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
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "leader",
    header: "Leader",
  },
  {
    accessorKey: "tribe",
    header: "Tribe",
  },
  {
    accessorKey: "message",
    header: "Prayer Request",
    cell: ({ row }) => {
      const message = row.getValue<string>("message");
      const truncatedMessage = truncateMessage(message, 50);
      const id = row.getValue<string>("id");
      return (
        <Link href={`/messages/${id}`}>
          <div className="font-semibold hover:underline cursor-pointer">{truncatedMessage}</div>
        </Link>
      );
    },
  },
];