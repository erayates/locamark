import MapComponent from "./components/MapComponent";
import Controllers from "./components/ui/controllers";
import Navbar from "./components/ui/navbar";
import { Map, View } from "ol";

import React from "react";
import { MapProvider } from "./context/MapContext";
import { ModalProvider } from "./context/ModalContext";
import Modals from "./components/Modals";
import { Toaster } from "./components/ui/toaster";
import MapPopup from "./components/MapPopup";

export interface InterfaceMapSettings {
  view: View | null;
  map: Map | null;
}

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    return storedTheme ?? "light";
  });

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ModalProvider>
      <MapProvider>
        <main className="">
          <Controllers theme={theme} setTheme={setTheme} />
          <Navbar />
          <MapComponent theme={theme} />

          <MapPopup />
          <Modals />
        </main>

        <Toaster />
      </MapProvider>
    </ModalProvider>
  );
};

export default App;
