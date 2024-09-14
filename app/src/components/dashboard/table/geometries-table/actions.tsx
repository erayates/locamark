import React from "react";
import { Pencil } from "lucide-react";

import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { _deleteGeometryById, _getGeometryById } from "@/pages/dashboard/geometries/actions";
import { IGeometry } from "@/types";
import { useModalContext } from "@/hooks/useModalContext";

type GeometriesTableActionProps = {
  rowData: IGeometry;
};

const GeometriesTableActions: React.FC<GeometriesTableActionProps> = ({
  rowData,
}) => {
  const { openModal } = useModalContext();

  const onUpdateButtonClick = async () => {
    const response = await _getGeometryById(rowData.id ?? 0);
    if (!response.success) return;
    openModal("update", response.data, "Geometry");
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onUpdateButtonClick}>
        <Pencil size={16} />
      </Button>
      <DeleteDialog
        variantOutline={true}
        handleDelete={async () => _deleteGeometryById(rowData.id ?? 0)}
      />
    </div>
  );
};

export default GeometriesTableActions;
