import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Avatar } from "../../avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../../button";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="pl-0 lg:pl-4 flex h-full w-2/12 lg:w-4/12 xl:w-3/12 items-center justify-center lg:justify-end z-40 bg-richBlack rounded-lg">
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

        <DropdownMenuContent className="w-44"></DropdownMenuContent>
      </DropdownMenu>

        <Button className="text-white hidden lg:block">
          <LogOutIcon onClick={handleLogout} className="w-6 h-6" />
        </Button>
    </div>
  );
};

export default Profile;
