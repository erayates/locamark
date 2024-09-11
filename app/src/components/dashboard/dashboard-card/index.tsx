import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  size?: "default" | "sm";
}

const DashboardCard = ({
  title,
  value,
  icon,
  size = "default",
}: DashboardCardProps) => {
  return (
    <Card className="w-auto grow">
      <CardContent className="p-0 m-0 grid grid-cols-6 items-center space-x-4 h-full">
        <div className="bg-[#00af90] col-span-1 h-full rounded-l-xl flex items-center justify-center p-2 text-white">
          {icon}
        </div>
        <div className="col-span-5 py-4">
          <p className="text-[#00828e] font-semibold text-2xl dark:text-white">
            {title}
          </p>
          <p
            className={cn(
              "text-[#00828e]/25 dark:text-white",
              size === "sm" ? "text-2xl" : "text-5xl"
            )}
          >
            {value.length > 10 ? `${value.slice(0, 10)}...` : value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
