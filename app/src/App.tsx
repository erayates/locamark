import React, { useEffect } from "react";
import { MapProvider } from "./contexts/MapContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Toaster } from "./components/ui/toaster";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useToast } from "./components/ui/use-toast";

const errorTypes = {
  unauthorized_access: {
    title: "Unauthorized Access",
    message: "You are not authorized to access this page.",
  },
};

const App: React.FC = () => {
  const location = useLocation();
  const { toast } = useToast();

  const getQueryParams = (query: string) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    if (queryParams.has("unauthorized_access")) {
      const error = errorTypes.unauthorized_access;
      toast({
        title: error.title,
        description: error.message,
        variant: "destructive",
      });
    }
  }, [location.search, toast]);

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
