import React, { useEffect, useState } from "react";
import { CustomPieChart } from "@/components/dashboard/charts/pie-chart";
import { CustomBarChart } from "@/components/dashboard/charts/bar-chart";
import DashboardCard from "@/components/dashboard/dashboard-card";
import DashboardPageHeader from "@/components/dashboard/page-header";
import { UsersRound, Waypoints } from "lucide-react";
import { _getAllUsers } from "./users/actions";
import { _getAllUsersGeometries } from "./geometries/actions";

const DashboardPage: React.FC = () => {
  const [cardsData, setCardsData] = useState({
    totalUsers: "Loading...",
    latestUser: "Loading...",
    totalGeometries: "Loading...",
    latestGeometry: "Loading...",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await _getAllUsers();
        const users = usersResponse.data.data;

        const geometriesResponse = await _getAllUsersGeometries();
        const geometries = geometriesResponse.data.data;

        setCardsData({
          totalUsers: users.length,
          latestUser: users[users.length - 1]?.name || "N/A",
          totalGeometries: geometries.length,
          latestGeometry: geometries[geometries.length - 1]?.name || "N/A",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-10 space-y-8">
      <DashboardPageHeader
        title="Dashboard"
        description="Welcome to the dashboard!"
        breadcrumbItems={[{ label: "Dashboard" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <DashboardCard
          title="Total Users"
          value={cardsData.totalUsers}
          icon={<UsersRound size={36} />}
        />

        <DashboardCard
          title="Latest User"
          value={cardsData.latestUser}
          icon={<UsersRound size={36} />}
        />

        <DashboardCard
          title="Total Geometries"
          value={cardsData.totalGeometries}
          icon={<Waypoints size={36} />}
        />

        <DashboardCard
          title="Latest Geometry"
          value={cardsData.latestGeometry}
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
