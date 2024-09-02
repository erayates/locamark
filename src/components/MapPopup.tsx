import { useMapContext } from "@/hooks/useMapContext";
import { Pencil, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { DeleteDialog } from "./DeleteDialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { useModalContext } from "@/hooks/useModalContext";
import { useToast } from "./ui/use-toast";

// interface ContentState {
//   id: number;
//   name: string;
//   wkt: string;
//   geometry: SimpleGeometry;
// }

export default function MapPopup() {
  const { state, setMapPopup } = useMapContext();
  const { openModal } = useModalContext();
  const { toast } = useToast();
  const popupRef = React.useRef(null);

  React.useEffect(() => {
    if (popupRef.current && state.overlay) {
      state.overlay.setElement(popupRef.current);
    }
  }, [state.overlay]);

  const handleClosePopup = () => {
    setMapPopup(null);
    state.overlay?.setPosition(undefined);
    state.select?.getFeatures().clear();
  };

  const handleDragDropUpdate = () => {
    toast({
      title: "Movement Mode",
      description:
        "You are currently in movement mode. If you drag and drop the selected geometry to another location, you will change its location.",
      variant: "info",
    });

    if (state.translate && state.modify) {
      state.map?.addInteraction(state.translate);
      state.map?.addInteraction(state.modify);
      state.modify.setActive(true);
    }

    setMapPopup(null);
    state.overlay?.setPosition(undefined);
  };

  const handleManuelUpdate = () => {
    const { id, wkt, name } = state.mapPopup ?? {};
    const content = { id: id ?? 0, wkt: wkt ?? "", name: name ?? "" };
    openModal("update", content);
  };

  return (
    <div
      id="popup"
      ref={popupRef}
      className="absolute transition-all duration-300 top-0 left-0 z-50 p-4 grid grid-cols-12 gap-4 bg-white shadow-md rounded-lg min-w-96 min-h-52"
    >
      <div className="col-span-10">
        <div className="bg-oxfordBlue text-white p-2 w-full flex rounded-lg px-2 justify-between items-center">
          <h1 className="text-sm sm:text-md font-semibold">
            {state.mapPopup?.name}
          </h1>
          <p className="text-muted-foreground text-xs font-semibold">
            {state.mapPopup?.geometry?.getType()}
          </p>
        </div>
        <div className=" mt-2 space-y-2">
          <div className="h-full space-y-2">
            <p className="bg-green-500 text-white font-semibold text-xs p-2 rounded-lg">
              WKT (Well-Known Text)
            </p>
            <p className="text-xs text-muted-foreground rounded-lg">
              Well-known text is a text markup language for representing vector
              geometry objects.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {state.mapPopup?.wkt}
          </p>
        </div>
      </div>

      <div className="flex flex-col text-white rounded-lg justify-between col-span-2">
        <Button
          className="p-3 bg-red-600 hover:bg-red-800"
          onClick={handleClosePopup}
        >
          <X color="white" strokeWidth={3} size={20} />
        </Button>

        <div className="flex flex-col items-center space-y-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="p-3 bg-blue-600 hover:bg-blue-800">
                <Pencil color="white" strokeWidth={3} size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button
                  className="text-xs w-full"
                  variant="outline"
                  onClick={handleManuelUpdate}
                >
                  Manuel Update
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="text-xs w-full"
                  variant="outline"
                  onClick={handleDragDropUpdate}
                >
                  Drag & Drop Update
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteDialog elementId={state.mapPopup?.id ?? 0} />
        </div>
      </div>
    </div>
  );
}
