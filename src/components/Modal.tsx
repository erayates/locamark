import React from "react";
import { useModalContext } from "../hooks/useModalContext";
import Sheet from "./ui/sheet";
import GeometryForm from "./forms/GeometryForm";
import Table from "./table";

const Modal: React.FC = () => {
  const { currentModals, isOpen, closeModal } = useModalContext();

  const modals: {
    [key: string]: { title: string; description: string; content: JSX.Element };
  } = {
    update: {
      title: "Update a Geometry",
      description: "Fill all inputs to update a geometry.",
      content: <GeometryForm />,
    },

    add: {
      title: "Add a Geometry",
      description: "Fill all inputs to add a new geometry.",
      content: <GeometryForm />,
    },

    table: {
      title: "All Geometries",
      description: "Manage and view all geometries.",
      content: <Table />,
    },
  };

  if (!isOpen || !currentModal) return null;

  return (
    <Sheet
      open={isOpen}
      setOpen={closeModal}
      title={modals[currentModal].title}
      description={modals[currentModal].description}
    >
      {modals[currentModal].content}
    </Sheet>
  );
};

export default Modal;
