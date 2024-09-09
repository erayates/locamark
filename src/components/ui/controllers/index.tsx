import {
  RotateCwSquare,
  RotateCcwSquare,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
} from "lucide-react";
import { useMapContext } from "../../../hooks/useMapContext";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../tooltip";

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={onZoomIn}
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
              >
                <ZoomIn />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={onZoomOut}
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
              >
                <ZoomOut />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={onRotateLeft}
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
              >
                <RotateCcwSquare />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Rotate Left</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={onRotateRight}
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
              >
                <RotateCwSquare />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Rotate Right</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                onClick={onToggleTheme}
                className="rounded-full bg-white text-richBlack hover:bg-muted shadow-md border w-12 h-12 flex justify-center items-center"
              >
                {theme === "light" ? <Moon /> : <Sun />}
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>
    </div>
  );
};

export default Controllers;
