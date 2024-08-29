import {
  RotateCwSquare,
  RotateCcwSquare,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
} from "lucide-react";
import Button from "../button";
import styles from "./style.module.css";
import { useMapContext } from "../../../hooks/useMapContext";

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
    <div className={styles.mapControllers}>
      <ul className={styles.mapControllersList}>
        <li className={styles.mapControllersListItem}>
          <Button
            color="light"
            size="md"
            rounded="full"
            tooltip="Zoom In"
            onClick={onZoomIn}
          >
            <ZoomIn />
          </Button>
        </li>

        <li className={styles.mapControllersListItem}>
          <Button
            color="light"
            size="md"
            rounded="full"
            tooltip="Zoom Out"
            onClick={onZoomOut}
          >
            <ZoomOut />
          </Button>
        </li>

        <li className={styles.mapControllersListItem}>
          <Button
            color="light"
            size="md"
            rounded="full"
            tooltip="Rotate Left"
            onClick={onRotateLeft}
          >
            <RotateCcwSquare />
          </Button>
        </li>

        <li className={styles.mapControllersListItem}>
          <Button
            color="light"
            size="md"
            rounded="full"
            tooltip="Rotate Right"
            onClick={onRotateRight}
          >
            <RotateCwSquare />
          </Button>
        </li>

        <li className={styles.mapControllersListItem}>
          <Button
            color="light"
            size="md"
            rounded="full"
            tooltip="Toggle Theme"
            onClick={onToggleTheme}
          >
            {theme === "light" ? <Moon /> : <Sun />}
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Controllers;
