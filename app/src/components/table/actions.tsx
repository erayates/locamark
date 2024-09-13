import React from "react";
import { Button } from "../ui/button";
import { Eye, Pencil } from "lucide-react";
import { DeleteDialog } from "../DeleteDialog";
import { useModalContext } from "@/hooks/useModalContext";
import { _getById } from "@/actions";
import { IGeometry } from "@/types";
import WKT from "ol/format/WKT";
import { getCenter } from "ol/extent";
import { useMapContext } from "@/hooks/useMapContext";
import { SimpleGeometry } from "ol/geom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";

type TableActionsProps = {
  rowData: IGeometry;
};

const TableActions: React.FC<TableActionsProps> = ({ rowData }) => {
  const { openModal, closeModal } = useModalContext();
  const { state, setMapPopup } = useMapContext();
  const { toast } = useToast();

  const onUpdateButtonClick = async () => {
    const response = await _getById(rowData.id ?? 0);
    if (!response.success) return;
    openModal("update", response.data, "Geometry");
  };

  const onDragAndDropUpdateButtonClick = () => {
    const format = new WKT();
    const geometry = format.readGeometry(rowData.wkt, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    state.view?.animate({
      center: getCenter(geometry.getExtent()),
      duration: 500,
      zoom: 7,
    });

    const existingFeature = state.source
      ?.getFeatures()
      .find((f) => f.get("id") === rowData.id);
    if (!existingFeature) return;

    if (state.translate && state.modify) {
      state.map?.addInteraction(state.translate);
      state.map?.addInteraction(state.modify);
      toast({
        title: "Movement Mode",
        description:
          "You are currently in movement mode. If you drag and drop the selected geometry to another location, you will change its location.",
        variant: "info",
      });
    }

    state.select?.getFeatures().clear();
    if (existingFeature) {
      state.select?.getFeatures().push(existingFeature);
    }

    closeModal("table");
  };

  const onShowButtonClick = () => {
    const format = new WKT();
    const geometry = format.readGeometry(rowData.wkt, {
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

    const popupData = {
      id: rowData.id ?? 0,
      name: rowData.name,
      wkt: rowData.wkt,
      geometry: geometry as SimpleGeometry,
    };

    const existingFeature = state.source
    ?.getFeatures()
    .find((f) => f.get("id") === rowData.id);

    if(!existingFeature) return;

    setMapPopup(popupData);

    closeModal("table");
    state.overlay?.setPosition(center);
    state.select?.getFeatures().clear();
    state.select?.getFeatures().push(existingFeature);

  };

  return (
    <div className="flex gap-2">
      <Button onClick={onShowButtonClick} variant="outline">
        <Eye size={16} />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Pencil size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52 p-2 space-y-2">
          <Button
            onClick={onUpdateButtonClick}
            className="w-full"
            variant="outline"
          >
            Manuel Update
          </Button>

          <Button
            onClick={onDragAndDropUpdateButtonClick}
            variant="outline"
            className="w-full"
          >
            Drag & Drop Update
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog elementId={rowData.id ?? 0} variantOutline={true} />
    </div>
  );
};

export default TableActions;
