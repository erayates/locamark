import { _update } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "./ui/use-toast";
import React from "react";
import { useModalContext } from "@/hooks/useModalContext";
import { IGeometry } from "@/types";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useMapContext } from "@/hooks/useMapContext";

export const UpdateDialog: React.FC = () => {
  const { toast } = useToast();
  const { modals, closeModal } = useModalContext();
  const [responseLoading, setResponseLoading] = React.useState<boolean>(false);

  const { state } = useMapContext();

  const handleUpdate = async () => {
    try {
      setResponseLoading(true);
      const response = await _update(
        modals.updateDialog.data?.id ?? 0,
        modals.updateDialog?.data ?? ({} as IGeometry)
      );

      if (response.success) {
        toast({
          title: "Success!",
          description: "Geometry updated successfully.",
          variant: "success",
        });

        if (state.translate && state.select) {
          state.map?.removeInteraction(state.translate);
          state.select.getFeatures().clear();
        }

        handleClose();
        return;
      }

      toast({
        title: "Error!",
        description: "Something went wrong! Please try again.",
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong! Please try again.",
        variant: "destructive",
      });
      console.log("Error updating geo.:", error);
    } finally {
      setResponseLoading(false);
    }
  };

  const handleClose = () => {
    closeModal("updateDialog");
  };

  return (
    <AlertDialog open={modals.updateDialog.isOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently update your
            geometry and update your data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          {responseLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <AlertDialogAction onClick={handleUpdate}>
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
