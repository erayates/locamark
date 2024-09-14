import { IGeometry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import GeometriesTableActions from "./actions";

export const GeometriesTableColumns: ColumnDef<IGeometry>[] = [
  {
    accessorKey: "appUserId",
    header: "User ID",
    cell: ({ getValue }) => {
      const appUserId = getValue() as string;
      return <div className="truncate w-[350px]">{appUserId}</div>;
    },
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => {
      const name = getValue() as string;
      return <div className="truncate w-[200px]">{name}</div>;
    },
  },
  {
    accessorKey: "wkt",
    header: "WKT",
    cell: ({ getValue }) => {
      const wkt = getValue() as string;
      return <div className="truncate w-[350px]">{wkt}</div>;
    },
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
