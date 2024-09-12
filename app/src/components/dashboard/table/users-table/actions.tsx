import React from "react";
import { Pencil } from "lucide-react";

import { useModalContext } from "@/hooks/useModalContext";
import { _getById } from "@/actions";
import { IGeometry } from "@/types";

import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";

type UsersTableActionsProps = {
  rowData: any;
};

const UsersTableActions: React.FC<UsersTableActionsProps> = ({ rowData }) => {
  //   const { openModal, closeModal } = useModalContext();
  //   const { toast } = useToast();

  const onUpdateButtonClick = async () => {
    // const response = await _getById(rowData.id ?? 0);
    // if (!response.success) return;
    // openModal("update", response.data);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onUpdateButtonClick}>
        <Pencil size={16} />
      </Button>
      <DeleteDialog elementId={rowData.id ?? 0} variantOutline={true} />
    </div>
  );
};

export default UsersTableActions;
