import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Avatar } from "../../avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../button";
import { Layout, LogOutIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Profile: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none hover:outline-none ring-0 active:outline-none focus:outline-none focus:ring-0 border-none">
          <div className="flex items-center justify-center lg:space-x-2">
            <div className="text-right hidden lg:block">
              <p className="text-white text-sm font-semibold">
                {user?.userName ?? "John Doe"}
              </p>
              <p className="text-muted-foreground text-[12px] font-semibold">
                {user?.email ?? ""}
              </p>
            </div>

            <Avatar>
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${user?.userName}`}
                alt="User Avatar"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-44 space-y-2 mr-4 bg-white rounded-xl p-2 block md:hidden">
          {isAdmin && (
            <Button asChild variant="outline" className="w-full">
              <a href="/dashboard" className="space-x-2">
                <Layout size={16} /> <span>Dashboard</span>
              </a>
            </Button>
          )}

          <Button
            className="w-full space-x-2"
            variant="outline"
            onClick={handleLogout}
          >
            <LogOutIcon size={16} />
            <span>Logout</span>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button className="text-white hidden lg:block">
        <LogOutIcon onClick={handleLogout} className="w-6 h-6" />
      </Button>
    </React.Fragment>
  );
};

export default Profile;
