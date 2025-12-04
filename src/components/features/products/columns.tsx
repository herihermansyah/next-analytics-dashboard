import {ColumnDef} from "@tanstack/react-table";
import ActionButton from "../../ActionButton";
import {ProductsType} from "@/types";

export const columns: ColumnDef<ProductsType>[] = [
  {
    accessorKey: "id",
    header: () => <span>No</span>,
    cell: ({row}) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "title",
    header: () => <span>Title</span>,
  },
  {
    accessorKey: "category",
    header: () => <span>Category</span>,
  },
  {
    accessorKey: "brand",
    header: () => <span>Brand</span>,
  },
  {
    id: "price",
    accessorFn: (row) => `$ ${row.price}`,
    header: () => <span>Price</span>,
  },
  {
    id: "action",
    header: () => <span>Action</span>,
    cell: ({row}) => <ActionButton url="products" params={row.original.id} />,
  },
];
