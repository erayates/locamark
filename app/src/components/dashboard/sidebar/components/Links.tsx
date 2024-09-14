import { LayoutGrid, UsersRound, Waypoints } from "lucide-react";

type Link = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

const links: Link[] = [
  {
    title: "Dashboard",
    icon: <LayoutGrid />,
    href: "/dashboard",
  },
  {
    title: "Geometries",
    icon: <Waypoints />,
    href: "/dashboard/geometries",
  },
  {
    title: "Users",
    icon: <UsersRound />,
    href: "/dashboard/users",
  },
  // {
  //   title: "Settings",
  //   icon: <Settings />,
  //   href: "/dashboard/settings",
  // },
];

const SidebarLinks: React.FC = () => {
  return (
    <ul>
      {links.map((link: Link, _idx: number) => (
        <div
          key={_idx}
          className={`flex w-full max-w-full hover:bg-white group items-center justify-between rounded-lg py-3 pl-8 `}
        >
          <a href={link.href} className="w-full">
            <div className="w-full items-center justify-center">
              <div className="flex w-full items-center justify-center">
                <div
                  className={`text mr-3 font-semibold text-white group-hover:text-richBlack dark:text-zinc-950`}
                >
                  {link.icon}
                </div>
                <p
                  className={`mr-auto text-sm  text-white group-hover:text-richBlack dark:text-zinc-950`}
                >
                  {link.title}
                </p>
              </div>
            </div>
          </a>
        </div>
      ))}
    </ul>
  );
};

export default SidebarLinks;
