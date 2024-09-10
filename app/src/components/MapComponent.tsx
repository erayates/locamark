/* eslint-disable react-hooks/exhaustive-deps */
import { useMapContext } from "@/hooks/useMapContext";
import { useModalContext } from "@/hooks/useModalContext";
import WKT from "ol/format/WKT";
import React, { useEffect, useRef } from "react";
import { useToast } from "./ui/use-toast";
import { SimpleGeometry } from "ol/geom";
import { getCenter } from "ol/extent";

interface MapComponentProps {
  theme: "light" | "dark";
}

interface ContentState {
  id: number;
  name: string;
  wkt: string;
  geometry: SimpleGeometry;
}

const MapComponent: React.FC<MapComponentProps> = ({ theme }) => {
  const { state, setMapPopup, fetchGeometries } = useMapContext();
  const { openModal } = useModalContext();
  const { toast } = useToast();

  // Using a ref to ensure the map container is referenced correctly
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mapRef.current && state.map) {
      state.map.setTarget(mapRef.current);
      fetchGeometries();
    }
  }, [state.map]);

  useEffect(() => {
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

      openModal("updateDialog", data);
    });

    state.modify?.on("modifystart", async (event) => {
      const feature = event.features.item(0);

      console.log(feature.getId(), state.mapPopup?.id);

      if (
        feature.getId() !== state.mapPopup?.id &&
        feature.getGeometry()?.getType() !== "Point"
      ) {
        event.preventDefault();
        toast({
          title: "Modification Restricted",
          description:
            "You can only modify the geometry of the currently selected feature.",
          variant: "destructive",
        });
        state.modify?.setActive(false);
        state.select?.getFeatures().clear();
        return;
      }
    });

    state.modify?.on("modifyend", async (event) => {
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

      openModal("updateDialog", data);
    });

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

      setMapPopup(null);
      state.overlay?.setPosition(undefined);
      state.select?.getFeatures().clear();
    });
  }, [state, openModal, toast, setMapPopup]);

  return (
    <div
      style={{ height: "100vh", width: "100%" }}
      ref={mapRef} // Attach ref here for the map container
      className={`${theme}`}
    ></div>
  );
};

export default MapComponent;
