import Sidebar from "@/components/dashboard/sidebar";
import DashboardTopNav from "@/components/dashboard/topnav";
import Modals from "@/components/Modals";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAdmin } = useAuth();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (!isAdmin) {
    return (
      <Navigate to="/?unauthorized_access" state={{ from: location }} replace />
    );
  }

  return (
    <React.Fragment>
      <div className="dark:bg-background-900 flex h-full w-full bg-white">
        <DashboardTopNav setIsOpen={setIsSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="h-full w-full dark:bg-zinc-950">
          <main
            className={`mx-2.5 mt-12 flex-none transition-all dark:bg-zinc-950 md:pr-2 md:ml-[328px]`}
          >
            {children}
          </main>
        </div>
      </div>
      <Modals />
    </React.Fragment>
  );
};

export default DashboardLayout;
