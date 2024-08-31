import { useMapContext } from "@/hooks/useMapContext";
import { Pencil, X } from "lucide-react";
import { getCenter } from "ol/extent";
import WKT from "ol/format/WKT";
import React from "react";
import { Button } from "./ui/button";
import { SimpleGeometry } from "ol/geom";
import { DeleteDialog } from "./DeleteDialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { useModalContext } from "@/hooks/useModalContext";
import { useToast } from "./ui/use-toast";

interface ContentState {
  id: number;
  name: string;
  wkt: string;
  geometry: SimpleGeometry;
}

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

  state.select?.on("select", (event) => {
    if (event.selected.length > 0) {
      const values = event.selected[0].getProperties();
      setMapPopup(values as ContentState);

      const format = new WKT();
      const geometry = format.readGeometry(values.wkt, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      const extent = geometry.getExtent();
      const center = getCenter(extent);
      state.view?.animate({
        center,
        duration: 500,
        zoom: 7,
      });

      state.overlay?.setPosition(center);
      return;
    }

    handleClosePopup();
  });

  const handleClosePopup = () => {
    setMapPopup(null);
    state.overlay?.setPosition(undefined);
    // state.select?.getFeatures().clear();
  };

  const handleDragDropUpdate = () => {
    toast({
      title: "Movement Mode",
      description:
        "You are currently in movement mode. If you drag and drop the selected geometry to another location, you will change its location.",
      variant: "info",
    });

    if (state.translate) {
      state.map?.addInteraction(state.translate);
    }

    state.translate?.on("translateend", async (event) => {
      const feature = event.features.item(0);
      const format = new WKT();
      const geometry = feature.getGeometry();
      const wkt =
        geometry &&
        (format.writeGeometry(geometry, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }) as string);

      const id = feature.getId() as number;
      const name = feature.get("name") as string;

      const data = { id, name, wkt: wkt ?? "" };

      console.log(wkt);

      openModal("updateDialog", data);
    });

    handleClosePopup();
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
        <p className="font-semibold text-xs sm:text-sm">
          WKT: {state.mapPopup?.wkt}
        </p>
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
          <DeleteDialog
            elementId={state.mapPopup?.id ?? 0}
            closePopup={handleClosePopup}
          />
        </div>
      </div>
    </div>
  );
}
