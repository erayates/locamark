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
      return <div className="truncate w-[350px]">{userId}</div>;
    },
  },

  {
    accessorKey: "userName",
    header: "Username",
    cell: ({ getValue }) => {
      const userName = getValue() as string;
      return <div className="truncate w-[200px]">{userName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => {
      const email = getValue() as string;
      return <div className="truncate w-[350px]">{email}</div>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original as {
        id: string;
        userName: string;
        email: string;
      };
      return <UsersTableActions rowData={rowData} />;
    },
  },
];
