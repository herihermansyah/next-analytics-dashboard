import {ColumnDef} from "@tanstack/react-table";
import {TodosType} from "@/types";
import {Check, X} from "lucide-react";

export const columns: ColumnDef<TodosType>[] = [
  {
    accessorKey: "id",
    header: () => <span>No</span>,
    cell: ({row}) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "todo",
    header: () => <span>Todo</span>,
  },
  {
    id: "completed",
    accessorFn: (row) => row.completed,
    header: () => <span>Completed</span>,
    cell: ({getValue}) => {
      const completed = getValue<boolean>();
      return (
        <span>
          {completed ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </span>
      );
    },
  },

  {
    accessorKey: "userId",
    header: () => <span>User ID</span>,
  },
];
