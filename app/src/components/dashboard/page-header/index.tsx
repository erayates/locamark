import { useAuth } from "@/hooks/useAuth";
import ResponsiveBreadcrumb from "../breadcrumb";

type DashboardPageHeaderProps = {
  title: string;
  breadcrumbItems: { href?: string; label: string }[];
  description: string;
};

const DashboardPageHeader: React.FC<DashboardPageHeaderProps> = ({
  title,
  breadcrumbItems,
  description,
}) => {
  const { user } = useAuth();
  return (
    <div className="flex justify-between flex-col lg:flex-row lg:items-center space-y-6 lg:space-y-[unset] mb-10">
      <div className="space-y-1.5">
        <ResponsiveBreadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="text-right hidden lg:block">
        <h2 className="text-xl font-semibold text-muted-foreground dark:text-white">
          Welcome, {user?.userName ?? "User"}! 👋🏻
        </h2>
        <p className="text-xs text-gray-400">
          Manage all settings from the dashboard!
        </p>
      </div>
    </div>
  );
};

export default DashboardPageHeader;
