import React from "react";
import { Pencil } from "lucide-react";

import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
  _deleteGeometryById,
  _getGeometryById,
} from "@/pages/dashboard/geometries/actions";
import { IGeometry } from "@/types";
import { useModalContext } from "@/hooks/useModalContext";
import { useNavigate } from "react-router-dom";

type GeometriesTableActionProps = {
  rowData: IGeometry;
};

const GeometriesTableActions: React.FC<GeometriesTableActionProps> = ({
  rowData,
}) => {
  const { openModal } = useModalContext();

  const navigate = useNavigate();

  const refresh = () => {
    navigate("/dashboard/geometries", { replace: true });
  };

  const onUpdateButtonClick = async () => {
    const response = await _getGeometryById(rowData.id ?? 0);
    if (!response.success) return;
    openModal("update", response.data, "Geometry", true);
  };

  return (
    <div className="flex gap-2 w-[150px]">
      <Button variant="outline" onClick={onUpdateButtonClick}>
        <Pencil size={16} />
      </Button>
      <DeleteDialog
        variantOutline={true}
        handleDelete={async () => _deleteGeometryById(rowData.id ?? 0)}
        type="Geometry"
        refresh={refresh}
      />
    </div>
  );
};

export default GeometriesTableActions;
