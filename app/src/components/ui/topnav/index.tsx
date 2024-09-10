import React from "react";
import Profile from "./profile";
import { useAuth } from "@/hooks/useAuth";

const TopNav: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 px-4 my-4 z-30 w-full flex gap-4 items-center h-20 justify-betweenshadow-lg">
      <div className="flex items-center w-10/12 lg:w-9/12 xl:w-10/12 justify-between h-full p-4 bg-richBlack rounded-lg">
        <img
          src="/assets/images/locamark-logo.png"
          width={200}
          height={50}
          alt="Locamark Logo"
        />
        <div className="text-right flex flex-col justify-center">
          <h2 className="text-white text-xl font-semibold">
            Welcome, {user?.userName ?? "User"}! 👋🏻
          </h2>
          <span className="text-muted-foreground text-xs font-semibold">
            Mark, save and travel!
          </span>
        </div>
      </div>

      <Profile />
    </header>
  );
};

export default TopNav;
