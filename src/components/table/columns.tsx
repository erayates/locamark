import { IGeometry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import TableActions from "./actions";

// Define columns including the actions column
export const columns: ColumnDef<IGeometry>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "wkt",
    header: "Wkt",
    cell: ({ getValue }) => {
      // Limit the width of the cell content
      const wktValue = getValue() as string;
      return <div className="truncate w-[400px]">{wktValue}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original; // Assuming IGeometry has an id field
      return <TableActions rowData={rowData} />;
    },
  },
];
