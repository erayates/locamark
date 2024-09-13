import { IGeometry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import GeometriesTableActions from "./actions";

export const GeometriesTableColumns: ColumnDef<IGeometry>[] = [
  {
    accessorKey: "appUserId",
    header: "User ID",
    cell: ({ getValue }) => {
      const appUserId = getValue() as string;
      return <div className="truncate w-[200px]">{appUserId}</div>;
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "wkt",
    header: "WKT",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original; // Assuming IGeometry has an id field
      return <GeometriesTableActions rowData={rowData} />;
    },
  },
];
