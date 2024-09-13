import React from "react";
import { useModalContext } from "../hooks/useModalContext";
import { ResponsiveDialog } from "./ResponsiveDialog";
import { UpdateForm } from "./forms/update-form";
import { CreateForm } from "./forms/create-form";
import { UpdateDialog } from "./UpdateDialog";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { useMapContext } from "@/hooks/useMapContext";
import { UpdateUserForm } from "./forms/update/user-form";

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
        title={`Update ${modals.update.type}`}
        description={`Fill out the form below to update a ${modals.update.type?.toLowerCase()}`}
      >
        {modals.update.type === "User" && <UpdateUserForm />}
        {modals.update.type === "Geometry" && <UpdateForm />}
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={modals.create.isOpen}
        setIsOpen={() => handleModalClose("create")}
        title={`Create ${modals.create.type}`}
        description={`Fill out the form below to create a ${modals.update.type?.toLowerCase()}`}
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
