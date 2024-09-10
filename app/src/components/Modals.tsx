import React from "react";
import { useModalContext } from "../hooks/useModalContext";
import { ResponsiveDialog } from "./ResponsiveDialog";
import { UpdateForm } from "./forms/update-form";
import { CreateForm } from "./forms/create-form";
import { UpdateDialog } from "./UpdateDialog";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useMapContext } from "@/hooks/useMapContext";

const Modals: React.FC = () => {
  const { modals, closeModal } = useModalContext();
  const { state } = useMapContext();

  // Handle modal close
  const handleModalClose = (modalName: string) => {
    closeModal(modalName);
  };

  return (
    <React.Fragment>
      <ResponsiveDialog
        isOpen={modals.update.isOpen}
        setIsOpen={() => handleModalClose("update")}
        title="Update Geometry"
        description="Fill out the form below to update a geometry."
      >
        <UpdateForm />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={modals.create.isOpen}
        setIsOpen={() => handleModalClose("create")}
        title="Create Geometry"
        description="Fill out the form below to create a geometry."
      >
        <CreateForm />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={modals.table.isOpen}
        setIsOpen={() => handleModalClose("table")}
        title="All Geometries"
        description="View and manage all geometries onto the map."
        isDataTable={true}
      >
        <DataTable columns={columns} data={state.geometries} />
      </ResponsiveDialog>

      {modals.updateDialog.isOpen && <UpdateDialog />}
    </React.Fragment>
  );
};

export default Modals;
