import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <Card className="w-auto grow bg-gradient-to-br from-purple-500 to-indigo-600">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 text-white">
        <CardTitle className="text-lg font-medium text-white">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {/* <p className="text-xs text-purple-100 mt-1">
          12% increase from last month
        </p> */}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
