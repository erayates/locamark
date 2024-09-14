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
  variantOutline,
  type,
  handleDelete,
  refresh,
}: {
  variantOutline?: boolean;
  refresh?: () => void;
  type?: "Geometry" | "User";
  handleDelete: () => Promise<{
    statusCode: number;
    success: boolean;
    message: string;
  }>;
}) {
  const { toast } = useToast();
  const { setMapPopup, state, fetchGeometries } = useMapContext();

  const onDelete = async () => {
    try {
      const response = await handleDelete();
      if (response.success) {
        toast({
          title: "Success!",
          description: `${type} deleted successfully.`,
          variant: "success",
        });

        if (type !== "User") {
          state.overlay?.setPosition(undefined);
          setMapPopup(null);
          fetchGeometries();
        }

        if (refresh) {
          refresh();
        }
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
      console.error("Error deleting item:", error); // Log the error for debugging
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
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
