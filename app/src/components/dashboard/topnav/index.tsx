import { Button } from "@/components/ui/button";
import { Menu, Bell, Settings } from "lucide-react";
import React from "react";

type DashboardTopNavProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardTopNav: React.FC<DashboardTopNavProps> = ({ setIsOpen }) => {
  return (
    <header className="fixed top-0 left-0 pl-[unset] md:pl-[300px] w-full bg-oxfordBlue text-white shadow-lg p-2">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4 md:space-x-[unset]">
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-sm tracking-widest uppercase font-bold">
            Locamark: Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-1">
          <Button size="sm" variant="ghost" className="rounded-full">
            <Bell size={20} />
          </Button>
          <Button size="sm" variant="ghost" className="rounded-full">
            <Settings size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopNav;
