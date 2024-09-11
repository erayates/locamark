import ResponsiveBreadcrumb from "@/components/dashboard/breadcrumb";
import DashboardCard from "@/components/dashboard/dashboard-card";
import Sidebar from "@/components/dashboard/sidebar";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { UsersRound, Waypoints } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dark:bg-background-900 flex h-full w-full bg-white">
      <Sidebar />
      <div className="h-full w-full dark:bg-zinc-950">
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-zinc-950 md:pr-2 xl:ml-[328px]`}
        >
          <div className="pt-10">
            <ResponsiveBreadcrumb
              items={[{ href: "/dashboard", label: "Dashboard" }]}
            />

            <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              Dashboard
            </h1>

            <Card className="p-4 mt-6">
              <h2 className="text-2xl font-semibold text-muted-foreground dark:text-white">
                Welcome, {user?.userName ?? "User"}! 👋🏻
              </h2>
              <p className="text-muted-foreground/50 text-sm dark:text-white">
                Welcome to the admin panel. Through this panel you can manage
                almost everything on the application.
              </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10  ">
              <DashboardCard
                title="Total Users"
                value="100"
                icon={<UsersRound />}
              />

              <DashboardCard
                title="Latest User"
                value="eates"
                icon={<Waypoints />}
                size="sm"
              />

              <DashboardCard
                title="Total Geometries"
                value="100"
                icon={<Waypoints />}
              />

              <DashboardCard
                title="Latest Geometry"
                value="Location XXX"
                icon={<Waypoints />}
                size="sm"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
