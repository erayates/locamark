import React from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { _getAll } from "../../actions";
import { IGeometry } from "../../types";

import styles from "./style.module.css";
import Button from "../ui/button";
import { Pencil, Trash, View } from "lucide-react";

const Table = () => {
  DataTable.use(DT);

  const [table, setTable] = React.useState<{
    data: IGeometry[];
    columns: { title: string; data: string }[];
    isLoading: boolean;
    error: boolean;
  }>({
    data: [],
    columns: [],
    isLoading: true,
    error: false,
  });

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await _getAll();
        if (response.success) {
          setTable({
            data: response.data,
            columns: [
              { title: "Name", data: "name" },
              { title: "WKT", data: "wkt" },
              { title: "", data: "" },
            ],
            isLoading: false,
            error: false,
          });
        }
      };

      fetchData();
    } catch (error) {
      setTable((prev) => ({ ...prev, error: true }));
    } finally {
      setTable((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const handleShow = (id: number) => {
    // Implement show functionality
    console.log("Show:", id);
  };

  const handleUpdate = (id: number) => {
    // Implement update functionality
    console.log("Update:", id);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log("Delete:", id);
  };

  if (table.isLoading) return <p>Loading...</p>;

  return (
    <DataTable
      data={table.data.map((row: IGeometry) => [row.name, row.wkt, "", row.id])}
      slots={{
        2: (data, row) => {
          return (
            <React.Fragment>
              <Button size="sm">
                <View />
              </Button>
              <Button size="sm">
                <Pencil />
              </Button>
              <Button size="sm">
                <Trash />
              </Button>
            </React.Fragment>
          );
        },
      }}
      options={{
        pageLength: 5,
        lengthChange: false, // Disable entries per page dropdown
        layout: {
          top: null,
          top1: null,
        },

        columnDefs: [
          {
            targets: 2,
            width: "25%",
            orderable: false,
          },
          {
            targets: -1,
            width: "0%",
            orderable: false,
          },
          {
            targets: 0,
            width: "15%",
            orderable: false,
          },
        ],
      }}
      className={styles.container}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>WKT</th>
          <th></th>
        </tr>
      </thead>
    </DataTable>
  );
};

export default Table;
