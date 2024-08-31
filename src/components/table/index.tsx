import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { _getAll } from "@/actions";
import { useFetch } from "@/hooks/useFetch"; // Adjust the import path as needed
import { IGeometry } from "@/types";

const GeometriesTable: React.FC = () => {
  const { data, isLoading, isError } = useFetch<IGeometry[]>(_getAll);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return <DataTable columns={columns} data={data || []} />;
};

export default GeometriesTable;

