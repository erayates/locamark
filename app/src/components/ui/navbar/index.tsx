import { Plus, ScanSearch, House, MapPin, Spline, Shapes } from "lucide-react";
import { fromLonLat } from "ol/proj";
import { useMapContext } from "../../../hooks/useMapContext";
import { useModalContext } from "../../../hooks/useModalContext";
import { Button } from "../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";
import { useToast } from "../use-toast";

type GeometryType = "Point" | "LineString" | "Polygon";

const Navbar: React.FC = () => {
  const { state, setDrawType } = useMapContext();
  const { openModal } = useModalContext();
  const { toast } = useToast();

  const { view } = state;

  const onGoToCenter = () =>
    view?.animate({ center: fromLonLat([35.2433, 38.9637]), zoom: 7 });

  const handleAddGeometry = (type: GeometryType) => {
    toast({
      title: `INSERT MODE`,
      description: `You are now in insert mode. Click on the map to add a ${type.toLowerCase()}.`,
      variant: "info",
    });
    setDrawType(type);
  };

  const handleShowAllGeometries = () => {
    openModal("table", { id: 0, wkt: "", name: "" });
  };

  return (
    <nav className="absolute bottom-[10px] p-4 rounded-lg left-1/2 -translate-x-1/2 bg-white shadow-lg z-20">
      <ul className="flex space-x-2">
        <li className="group">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
                onClick={onGoToCenter}
              >
                <House />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Go to Center</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li className="group">
          <Button
            type="submit"
            className="rounded-full bg-green-800 hover:bg-green-900 text-white w-12 h-12 p-2"
          >
            <Plus />
          </Button>

          <ul className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bottom-[80%] pb-6 space-y-2 group-hover:">
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
                    onClick={() => handleAddGeometry("Point")}
                  >
                    <MapPin />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add a Point</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
                    onClick={() => handleAddGeometry("LineString")}
                  >
                    <Spline />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add a Linestring</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
            <li>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
                    onClick={() => handleAddGeometry("Polygon")}
                  >
                    <Shapes />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Add a Polygon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          </ul>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
                onClick={handleShowAllGeometries}
              >
                <ScanSearch />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Show All Geometries</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
