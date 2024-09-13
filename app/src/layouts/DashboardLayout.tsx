import Sidebar from "@/components/dashboard/sidebar";
import Modals from "@/components/Modals";
import React from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <div className="dark:bg-background-900 flex h-full w-full bg-white">
        <Sidebar />
        <div className="h-full w-full dark:bg-zinc-950">
          <main
            className={`mx-2.5 flex-none transition-all dark:bg-zinc-950 md:pr-2 md:ml-[328px]`}
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
