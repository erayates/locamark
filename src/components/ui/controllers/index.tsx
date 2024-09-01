import {
  RotateCwSquare,
  RotateCcwSquare,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "../button";
import { useMapContext } from "../../../hooks/useMapContext";
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";

interface ControllersProps {
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  theme: "light" | "dark";
}

const Controllers: React.FC<ControllersProps> = ({ setTheme, theme }) => {
  const { state } = useMapContext();
  const { view } = state;

  const onRotateLeft = () =>
    view?.animate({ rotation: (view.getRotation() ?? 0) - Math.PI / 2 });

  const onRotateRight = () =>
    view?.animate({ rotation: (view.getRotation() ?? 0) + Math.PI / 2 });

  const onZoomIn = () => view?.animate({ zoom: (view.getZoom() ?? 0) + 1 });

  const onZoomOut = () => view?.animate({ zoom: (view.getZoom() ?? 0) - 1 });

  const onToggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <div className="absolute left-[10px] p-4 rounded-lg top-1/2 -translate-y-1/2 bg-white shadow-lg z-20">
      <ul className="flex flex-col space-y-2">
        <li>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 p-2"
                onClick={onZoomIn}
              >
                <ZoomIn />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Zoom In</p>
            </TooltipContent>
          </Tooltip>
        </li>

        <li>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 p-2"
                onClick={onZoomOut}
              >
                <ZoomOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Zoom Out</p>
            </TooltipContent>
          </Tooltip>
        </li>

        <li>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 p-2"
                onClick={onRotateLeft}
              >
                <RotateCcwSquare />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Rotate Left</p>
            </TooltipContent>
          </Tooltip>
        </li>

        <li>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 p-2"
                onClick={onRotateRight}
              >
                <RotateCwSquare />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Rotate Right</p>
            </TooltipContent>
          </Tooltip>
        </li>

        <li>
          <Tooltip>
            <TooltipTrigger>
              <Button
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 p-2"
                onClick={onToggleTheme}
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Toggle Theme</p>
            </TooltipContent>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default Controllers;
