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

type TableActionsProps = {
  rowData: IGeometry;
};

const TableActions: React.FC<TableActionsProps> = ({ rowData }) => {
  const { openModal, closeModal } = useModalContext();
  const { state, setMapPopup } = useMapContext();

  const onUpdateButtonClick = async () => {
    const response = await _getById(rowData.id ?? 0);
    if (!response.success) return;
    openModal("update", response.data);
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

    setMapPopup(popupData);

    closeModal("table");
    state.overlay?.setPosition(center);
  };

  return (
    <div className="flex gap-2">
      <Button onClick={onShowButtonClick} variant="outline">
        <Eye size={16} />
      </Button>
      <Button onClick={onUpdateButtonClick} variant="outline">
        <Pencil size={16} />
      </Button>
      <DeleteDialog elementId={rowData.id ?? 0} variantOutline={true} />
    </div>
  );
};

export default TableActions;
