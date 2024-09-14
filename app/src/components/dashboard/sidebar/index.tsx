"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import SidebarLinks from "./components/Links";
import { useAuth } from "@/hooks/useAuth";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { cn } from "@/lib/utils";
//   } ${props?.open ? "" : "-translate-x-[120%] xl:translate-x-[unset]"}`}

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();

  return (
    <div
      className={cn(
        `lg:!z-99 fixed shadow-xl !z-[99] bg-richBlack min-h-full w-[300px] transition-all md:!z-[99] xl:!z-0 xl:block`,
        isOpen ? "" : "-translate-x-[120%] md:translate-x-[unset]"
      )}
    >
      <div
        className={`h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 p-4 dark:border-zinc-800 `}
      >
        <div className="absolute top-2 md:hidden right-4 text-white">
          <Button variant="default" className="text-white p-0">
            <X size={24} onClick={() => setIsOpen(false)} />
          </Button>
        </div>
        <div className="flex h-full flex-col justify-between w-full">
          <div>
            <div className={`mt-8 flex items-center justify-center`}>
              <a href="/">
                <img
                  src="/assets/images/locamark-logo.png"
                  width={200}
                  height={50}
                  alt="Locamark Logo"
                />
              </a>
            </div>
            <div className="my-8 h-px bg-muted-foreground/50 dark:bg-white/10" />
            <SidebarLinks />
          </div>
          <div className="mb-9 mt-7">
            <div className="flex items-center justify-center">
              <Button
                asChild
                variant="outline"
                className="text-xs p-3 font-semibold w-full bg-transparent text-white border-muted-foreground"
              >
                <a href="/">Go to App</a>
              </Button>
            </div>
            <div className="mt-5 flex w-full items-center rounded-lg border border-muted-foreground/50 bg-white p-4 dark:border-zinc-800">
              <a href="/dashboard/dashboard/settings">
                <Avatar>
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user?.userName}`}
                    alt="User Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </a>
              <a href="/dashboard/settings">
                <p className="ml-2 mr-3 flex  items-center text-sm font-semibold leading-none text-zinc-950 dark:text-white">
                  {user?.userName}
                </p>
                <p className="ml-2 mr-3 flex  items-center text-xs text-muted-foreground leading-none dark:text-white">
                  {user?.email}
                </p>
              </a>

              <Button
                variant="outline"
                className="ml-auto flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full p-0 text-center text-sm font-medium hover:dark:text-white"
                type="submit"
              >
                <LogOut size={16} onClick={logout} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
