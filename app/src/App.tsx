import React from "react";
import { MapProvider } from "./context/MapContext";
import { ModalProvider } from "./context/ModalContext";
import { Toaster } from "./components/ui/toaster";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

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