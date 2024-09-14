import React from "react";
import { Pencil } from "lucide-react";

import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { _deleteUser, _getUserById } from "@/pages/dashboard/users/actions";
import { useModalContext } from "@/hooks/useModalContext";

type UsersTableActionsProps = {
  rowData: {
    id: string;
    userName: string;
    email: string;
  };
};

const UsersTableActions: React.FC<UsersTableActionsProps> = ({ rowData }) => {
  const { openModal, modals } = useModalContext();

  const onUpdateButtonClick = async () => {
    const response = await _getUserById(rowData.id);
    if (!response.success) return;
    openModal("update", response.data, "User");
    console.log(modals.update);
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onUpdateButtonClick}>
        <Pencil size={16} />
      </Button>
      <DeleteDialog
        variantOutline={true}
        type="User"
        handleDelete={async () => _deleteUser(rowData.id)}
      />
    </div>
  );
};

export default UsersTableActions;
