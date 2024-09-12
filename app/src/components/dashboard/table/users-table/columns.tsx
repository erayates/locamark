import { IGeometry } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UsersTableActions from "./actions";
import { Badge } from "@/components/ui/badge";

// Define columns including the actions column
export const UserTableColumns: ColumnDef<IGeometry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => {
      const userId = getValue() as string;
      return <div className="truncate w-[200px]">{userId}</div>;
    },
  },

  {
    accessorKey: "userName",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "twoFactorEnabled",
    header: "Two Factor",
    cell: ({ getValue }) => {
      const isTwoFactorEnabled = getValue() as string;
      return <Badge>{isTwoFactorEnabled ? "Enabled" : "Disabled"}</Badge>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original; // Assuming IGeometry has an id field
      return <UsersTableActions rowData={rowData} />;
    },
  },
];
