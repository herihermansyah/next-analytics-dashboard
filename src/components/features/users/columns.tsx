import {UsersType} from "@/types/user.types";
import {ColumnDef} from "@tanstack/react-table";
import ActionButton from "../../ActionButton";

export const columns: ColumnDef<UsersType>[] = [
  {
    accessorKey: "id",
    header: () => <span>No</span>,
    cell: ({row}) => <span>{row.index + 1}</span>,
  },
  {
    id: "fullName",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: () => <span>Full Name</span>,
    cell: ({row}) => {
      const fullName = row.getValue("fullName");
      return <span>{fullName as string}</span>;
    },
  },
  {
    accessorKey: "email",
    header: () => <span>Email</span>,
  },
  {
    accessorKey: "gender",
    header: () => <span>Gender</span>,
  },
  {
    id: "action",
    header: () => <span>Action</span>,
    cell: ({row}) => <ActionButton url="users" params={row.original.id} />,
  },
];
