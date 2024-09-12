import { _getAllUsers } from "@/actions/users";
import { UsersTable } from "@/components/dashboard/table/users-table/data-table";
import { useFetch } from "@/hooks/useFetch";

import { UserTableColumns } from "@/components/dashboard/table/users-table/columns";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ErrorComponent";
import DashboardPageHeader from "@/components/dashboard/page-header";

const GeometriesPage: React.FC = () => {
  const { data, isLoading, isError } = useFetch(_getAllUsers);

  return (
    <div className="pt-10">
      <DashboardPageHeader
        breadcrumbItems={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Geometries" },
        ]}
        title="Geometries"
        description="Manage all geometries in the application."
      />

      {isError && (
        <ErrorComponent
          title="Something went wrong!"
          message="Something went wrong when trying to fetch data. Please try again later and contact us."
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && !isError && (
        <UsersTable columns={UserTableColumns} data={data} />
      )}
    </div>
  );
};

export default GeometriesPage;
