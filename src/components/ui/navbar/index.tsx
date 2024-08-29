import { Plus, ScanSearch, House, MapPin, Spline, Shapes } from "lucide-react";
import styles from "./style.module.css";
import Button from "../button";
import { fromLonLat } from "ol/proj";
import { useMapContext } from "../../../hooks/useMapContext";
import { useModalContext } from "../../../hooks/useModalContext";

type GeometryType = "Point" | "LineString" | "Polygon";

const Navbar: React.FC = () => {
  const { state, setDrawType } = useMapContext();
  const { openModal } = useModalContext();

  const { view } = state;

  const onGoToCenter = () =>
    view?.animate({ center: fromLonLat([35.2433, 38.9637]), zoom: 7 });

  const handleAddGeometry = (type: GeometryType) => {
    setDrawType(type);
  };

  const handleShowAllGeometries = () => {
    openModal("table");
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
        <li className={styles.navbarListItem}>
          <Button
            color="dark"
            size="md"
            rounded="full"
            tooltip="Go to Center"
            onClick={onGoToCenter}
          >
            <House />
          </Button>
        </li>
        <li className={styles.navbarListItem}>
          <Button color="dark" size="md" rounded="full">
            <Plus />
          </Button>

          <ul className={styles.navbarListItemDropdown}>
            <li className={styles.navbarListItemDropdownItem}>
              <Button
                color="light"
                size="md"
                rounded="full"
                tooltip="Add a Point"
                onClick={() => handleAddGeometry("Point")}
              >
                <MapPin />
              </Button>
            </li>
            <li className={styles.navbarListItemDropdownItem}>
              <Button
                color="light"
                size="md"
                rounded="full"
                tooltip="Add a Line"
                onClick={() => handleAddGeometry("LineString")}
              >
                <Spline />
              </Button>
            </li>
            <li className={styles.navbarListItemDropdownItem}>
              <Button
                color="light"
                size="md"
                rounded="full"
                tooltip="Add a Polygon"
                onClick={() => handleAddGeometry("Polygon")}
              >
                <Shapes />
              </Button>
            </li>
          </ul>
        </li>
        <li className={styles.navbarListItem}>
          <Button
            color="dark"
            size="md"
            rounded="full"
            tooltip="Show All Geometries"
            onClick={handleShowAllGeometries}
          >
            <ScanSearch />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
