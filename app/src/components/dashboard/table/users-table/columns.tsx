import { IUser } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import UsersTableActions from "./actions";

// Define columns including the actions column
export const UserTableColumns: ColumnDef<IUser>[] = [
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original as { id: string; userName: string; email: string };
      return <UsersTableActions rowData={rowData} />;
    },
  },
];
