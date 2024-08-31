import React, { createContext, useReducer, ReactNode } from "react";
import { Feature, Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, SimpleGeometry } from "ol/geom";
import { fromLonLat } from "ol/proj";
import { Modify, Snap, Draw, Select, Translate } from "ol/interaction";
import WKT from "ol/format/WKT";
import { useModalContext } from "../hooks/useModalContext";
import { _getAll } from "../actions";
import { IGeometry } from "../types";

type MapPopup = {
  id: number | null | undefined;
  name: string | null | undefined;
  wkt: string | null | undefined;
  geometry?: SimpleGeometry | null | undefined;
};

interface MapState {
  map: Map | null;
  view: View | null;
  source: VectorSource<Feature<Geometry>> | null;
  layer: TileLayer<OSM> | null;
  modify: Modify | null;
  draw: Draw | null;
  overlay: Overlay | null;
  select: Select | null;
  translate: Translate | null;
  drawType: "Point" | "LineString" | "Polygon";
  mapPopup: MapPopup | null; // Add mapPopup to the MapState
}

const initialState: MapState = {
  map: null,
  view: null,
  source: null,
  layer: null,
  modify: null,
  draw: null,
  select: null,
  overlay: null,
  translate: null,
  drawType: "Point", // Default draw type
  mapPopup: null, // Initialize mapPopup as null
};

type Action =
  | { type: "SET_MAP"; payload: Map }
  | { type: "SET_VIEW"; payload: View }
  | { type: "SET_SOURCE"; payload: VectorSource<Feature<Geometry>> }
  | { type: "SET_LAYER"; payload: TileLayer<OSM> }
  | { type: "SET_MODIFY"; payload: Modify }
  | { type: "SET_DRAW"; payload: Draw }
  | { type: "SET_DRAW_TYPE"; payload: "Point" | "LineString" | "Polygon" }
  | { type: "SET_SELECT"; payload: Select }
  | { type: "SET_OVERLAY"; payload: Overlay }
  | { type: "SET_MAP_POPUP"; payload: MapPopup | null }
  | { type: "SET_TRANSLATE"; payload: Translate };

export const MapContext = createContext<
  | {
      state: MapState;
      dispatch: React.Dispatch<Action>;
      setDrawType: (type: "Point" | "LineString" | "Polygon") => void;
      setMapPopup: (geometry: MapPopup | null) => void; 
    }
  | undefined
>(undefined);

const mapReducer = (state: MapState, action: Action): MapState => {
  switch (action.type) {
    case "SET_MAP":
      return { ...state, map: action.payload };
    case "SET_VIEW":
      return { ...state, view: action.payload };
    case "SET_SOURCE":
      return { ...state, source: action.payload };
    case "SET_LAYER":
      return { ...state, layer: action.payload };
    case "SET_MODIFY":
      return { ...state, modify: action.payload };
    case "SET_DRAW":
      return { ...state, draw: action.payload };
    case "SET_SELECT":
      return { ...state, select: action.payload };
    case "SET_OVERLAY":
      return { ...state, overlay: action.payload };
    case "SET_DRAW_TYPE":
      return { ...state, drawType: action.payload };
    case "SET_TRANSLATE":
      return { ...state, translate: action.payload };
    case "SET_MAP_POPUP":
      return { ...state, mapPopup: action.payload }; 
    default:
      return state;
  }
};

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, initialState);

  const { openModal } = useModalContext();

  const setDrawType = (type: "Point" | "LineString" | "Polygon") => {
    if (state.draw) {
      state.draw.setActive(false); 
      state.map?.removeInteraction(state.draw); 
    }

    const newDraw = new Draw({
      source: state.source!,
      type: type,
    });

    newDraw.on("drawend", function (event) {
      newDraw.setActive(false);

      const feature = event.feature ?? new Geometry();
      const format = new WKT();

      const geometry = feature.getGeometry();
      const wkt = geometry
        ? format.writeGeometry(geometry, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          })
        : "";

      const data = {
        name: "",
        wkt,
      };

      openModal("create", data);

      event.feature.setGeometry(undefined);
    });

    state.map?.addInteraction(newDraw);
    dispatch({ type: "SET_DRAW", payload: newDraw });
    dispatch({ type: "SET_DRAW_TYPE", payload: type });
  };

  const setMapPopup = (geometry: MapPopup | null) => {
    dispatch({ type: "SET_MAP_POPUP", payload: geometry });
  };

  React.useEffect(() => {
    const mapSource = new VectorSource();
    dispatch({ type: "SET_SOURCE", payload: mapSource });

    const vectorLayer = new VectorLayer({
      source: mapSource,
      style: {
        "icon-src":
          "https://cdn-icons-png.freepik.com/256/16138/16138236.png?semt=ais_hybrid",
        "icon-opacity": 0.95,
        "icon-scale": 0.15,
        "icon-anchor": [0.5, 46],
        "icon-anchor-x-units": "fraction",
        "icon-anchor-y-units": "pixels",
        "stroke-width": 3,
        "stroke-color": [32, 145, 136, 1],
        "fill-color": [48, 213, 200, 0.4],
      },
    });

    const osmSource = new OSM();
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: osmSource,
    });

    dispatch({ type: "SET_LAYER", payload: osmLayer });

    const modify = new Modify({ source: mapSource });
    dispatch({ type: "SET_MODIFY", payload: modify });

    const mapView = new View({
      center: fromLonLat([35.2433, 38.9637]),
      zoom: 7,
    });

    dispatch({ type: "SET_VIEW", payload: mapView });

    const overlay = new Overlay({
      element: undefined,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    dispatch({ type: "SET_OVERLAY", payload: overlay });

    const mapInstance = new Map({
      target: "map",
      layers: [osmLayer, vectorLayer],
      controls: [],
      overlays: [overlay],
      view: mapView,
    });

    const snap = new Snap({ source: mapSource });
    mapInstance.addInteraction(snap);

    dispatch({ type: "SET_MAP", payload: mapInstance });

    const draw = new Draw({
      source: mapSource,
      type: state.drawType,
    });

    draw.on("drawend", function (event) {
      draw.setActive(false);

      const feature = event.feature ?? new Geometry();
      const format = new WKT();

      const geometry = feature.getGeometry();
      const wkt = geometry
        ? format.writeGeometry(geometry, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          })
        : "";

      console.log(wkt);

      event.feature.setGeometry(undefined);
    });

    mapInstance.addInteraction(draw);
    dispatch({ type: "SET_DRAW", payload: draw });

    const select = new Select();

    const translate = new Translate({
      features: select.getFeatures(),
    });

    mapInstance.addInteraction(select);
    
    dispatch({ type: "SET_SELECT", payload: select });
    dispatch({ type: "SET_TRANSLATE", payload: translate }); 

    draw.setActive(false); 

    const fetchGeometries = async () => {
      state.source?.clear();
      const response = await _getAll();
      if (response.success) {
        response.data.forEach((geometry: IGeometry) => {
          createGeometry(geometry);
        });
      }
    };

    const createGeometry = (geometry: IGeometry) => {
      const format = new WKT();
      const wkt = geometry.wkt;

      const feature = format.readFeature(wkt, {
        dataProjection: "EPSG:4326", 
        featureProjection: "EPSG:3857", 
      });

      feature.setProperties({
        id: geometry.id,
        name: geometry.name,
        wkt: geometry.wkt,
      });

      feature.setId(geometry.id);
      mapSource.addFeature(feature);
    };

    fetchGeometries();

    return () => {
      mapInstance.setTarget(undefined);
    };
  }, []);

  return (
    <MapContext.Provider value={{ state, dispatch, setDrawType, setMapPopup }}>
      {children}
    </MapContext.Provider>
  );
};
