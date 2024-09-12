import ResponsiveBreadcrumb from "@/components/dashboard/breadcrumb";
import { DataTable } from "@/components/table/data-table";
import { useFetch } from "@/hooks/useFetch";

const UsersPage: React.FC = () => {
  const { data, isLoading, isError } = useFetch();

  return (
    <div className="pt-10">
      <ResponsiveBreadcrumb
        items={[{ href: "/dashboard", label: "Dashboard" }, { label: "Users" }]}
      />

      <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
        Users
      </h1>

      <DataTable columns={[]} data={[]} />
    </div>
  );
};

export default UsersPage;
