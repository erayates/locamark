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
    <div className="flex justify-between items-center mb-10">
      <div className="space-y-2">
        <ResponsiveBreadcrumb items={breadcrumbItems} />
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <h2 className="text-2xl font-semibold text-muted-foreground dark:text-white">
        Welcome, {user?.userName ?? "User"}! 👋🏻
      </h2>
    </div>
  );
};

export default DashboardPageHeader;
