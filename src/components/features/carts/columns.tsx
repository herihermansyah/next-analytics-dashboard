import {ColumnDef} from "@tanstack/react-table";
import ActionButton from "../../ActionButton";
import {CartsType} from "@/types";

export const columns: ColumnDef<CartsType>[] = [
  {
    accessorKey: "id",
    header: () => <span>No</span>,
    cell: ({row}) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "userId",
    header: () => <span>User ID</span>,
  },
  {
    accessorKey: "totalProducts",
    header: () => <span>Total Products</span>,
  },
  {
    accessorKey: "totalQuantity",
    header: () => <span>Total Quantity</span>,
  },
  {
    id: "total",
    accessorFn: (row) => `$ ${row.total.toLocaleString()}`,
    header: () => <span>Total price</span>,
  },
  {
    id: "action",
    header: () => <span>Action</span>,
    cell: ({row}) => <ActionButton url="carts" params={row.original.id} />,
  },
];
