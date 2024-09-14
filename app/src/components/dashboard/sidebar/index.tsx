"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import SidebarLinks from "./components/Links";
import { useAuth } from "@/hooks/useAuth";
import { AvatarImage } from "@radix-ui/react-avatar";
//   } ${props?.open ? "" : "-translate-x-[120%] xl:translate-x-[unset]"}`}

function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div
      className={`lg:!z-99 fixed shadow-xl !z-[99] bg-richBlack min-h-full w-[300px] -translate-x-[120%] md:translate-x-[unset] transition-all md:!z-[99] xl:!z-0 xl:block`}
    >
      <div
        className={`h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 p-4 dark:border-zinc-800 `}
      >
        <div className="flex h-full flex-col justify-between w-full">
          <div>
            <span className="absolute top-4 block cursor-pointer text-zinc-200 dark:text-white/40 xl:hidden">
              <Menu size={24} />
            </span>
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
}

// PROPS

export default Sidebar;
