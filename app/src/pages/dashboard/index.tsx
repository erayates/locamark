import { CustomPieChart } from "@/components/dashboard/charts/pie-chart";
import { CustomBarChart } from "@/components/dashboard/charts/bar-chart";
import DashboardCard from "@/components/dashboard/dashboard-card";
import DashboardPageHeader from "@/components/dashboard/page-header";
import { UsersRound, Waypoints } from "lucide-react";

const DashboardPage: React.FC = () => {
  return (
    <div className="pt-10 space-y-8">
      <DashboardPageHeader
        title="Dashboard"
        description="Welcome to the dashboard!"
        breadcrumbItems={[{ label: "Dashboard" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10  ">
        <DashboardCard
          title="Total Users"
          value="100"
          icon={<UsersRound size={36} />}
        />

        <DashboardCard
          title="Latest User"
          value="eates"
          icon={<Waypoints size={36} />}
        />

        <DashboardCard
          title="Total Geometries"
          value="100"
          icon={<Waypoints size={36} />}
        />

        <DashboardCard
          title="Latest Geometry"
          value="Location XXX"
          icon={<Waypoints size={36} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <CustomBarChart />
        </div>

        <div className="col-span-1 w-full">
          <CustomPieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
