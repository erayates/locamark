import React from "react";
import Profile from "./profile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../button";
import { Layout } from "lucide-react";

const TopNav: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 px-4 my-4 z-30 w-full flex gap-4 items-center h-20 justify-betweenshadow-lg">
      <div className="flex items-center justify-between w-10/12 lg:w-9/12 xl:w-11/12 h-full bg-richBlack">
        <div className="flex w-full divide-x divide-dashed divide-muted-foreground p-4">
          <img
            src="/assets/images/locamark-logo.png"
            width={200}
            height={50}
            alt="Locamark Logo"
            className="mr-8"
          />
          <div className="text-left hidden md:flex flex-col justify-center pl-8">
            <h2 className="text-white text-xl font-semibold">
              Welcome, {user?.userName ?? "User"}! 👋🏻
            </h2>
            <span className="text-muted-foreground text-xs font-semibold">
              Mark, save and travel!
            </span>
          </div>
        </div>
        <div className="mr-4 hidden md:block">
          {isAdmin && (
            <Button
              asChild
              variant="outline"
              className="text-xs p-3 font-semibold w-full bg-transparent text-white border-muted-foreground"
            >
              <a href="/dashboard" className="space-x-2">
                <Layout />
                <span>Dashboard</span>
              </a>
            </Button>
          )}
        </div>
      </div>
      <div className="pl-0 lg:pl-4 flex h-full w-2/12 lg:w-4/12 xl:w-3/12 items-center justify-center lg:justify-end z-40 bg-richBlack">
        <Profile />
      </div>
    </header>
  );
};

export default TopNav;
