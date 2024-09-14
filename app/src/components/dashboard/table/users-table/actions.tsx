import React from "react";
import { Pencil } from "lucide-react";

import { DeleteDialog } from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import { _deleteUser, _getUserById } from "@/pages/dashboard/users/actions";
import { useModalContext } from "@/hooks/useModalContext";
import { useNavigate } from "react-router-dom";

type UsersTableActionsProps = {
  rowData: {
    id: string;
    userName: string;
    email: string;
  };
};

const UsersTableActions: React.FC<UsersTableActionsProps> = ({ rowData }) => {
  const { openModal, modals } = useModalContext();

  const navigate = useNavigate();

  const onUpdateButtonClick = async () => {
    const response = await _getUserById(rowData.id);
    if (!response.success) return;
    openModal("update", response.data, "User");
    console.log(modals.update);
  };

  const refresh = () => {
    navigate("/dashboard/users", { replace: true });
  };

  return (
    <div className="flex gap-2 w-[150px]">
      <Button variant="outline" onClick={onUpdateButtonClick}>
        <Pencil size={16} />
      </Button>
      <DeleteDialog
        variantOutline={true}
        type="User"
        handleDelete={async () => _deleteUser(rowData.id)}
        refresh={refresh}
      />
    </div>
  );
};

export default UsersTableActions;
