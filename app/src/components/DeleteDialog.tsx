import { _delete } from "@/actions";
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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useMapContext } from "@/hooks/useMapContext";

export function DeleteDialog({
  elementId,
  variantOutline,
}: {
  elementId: number;
  variantOutline?: boolean;
}) {
  const { toast } = useToast();
  const { setMapPopup, state, fetchGeometries } = useMapContext();

  const handleDelete = async () => {
    try {
      const response = await _delete(elementId);
      if (response.success) {
        toast({
          title: "Success!",
          description: "Geometry deleted successfully.",
          variant: "success",
        });

        state.overlay?.setPosition(undefined);
        setMapPopup(null);
        fetchGeometries();
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
        onError: () => console.log("Error deleting geo.:", error),
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {variantOutline ? (
          <Button variant="outline">
            <Trash strokeWidth={2} size={16} />
          </Button>
        ) : (
          <Button className={"p-3 bg-pink-600 hover:bg-pink-800"}>
            <Trash color="white" strokeWidth={3} size={20} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            geometry and remove your data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
