import React from "react";
import { MapProvider } from "./contexts/MapContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Toaster } from "./components/ui/toaster";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <ModalProvider>
      <AuthProvider>
        <MapProvider>
          <Toaster />
          <main className="h-screen">
            <Outlet />
          </main>
        </MapProvider>
      </AuthProvider>
    </ModalProvider>
  );
};

export default App;
