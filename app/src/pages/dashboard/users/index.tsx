import { UsersTable } from "@/components/dashboard/table/users-table/data-table";
import { useFetch } from "@/hooks/useFetch";

import { UserTableColumns } from "@/components/dashboard/table/users-table/columns";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ErrorComponent";
import DashboardPageHeader from "@/components/dashboard/page-header";
import { _getAllUsers } from "./actions";

const UsersPage: React.FC = () => {
  const { data, isLoading, isError } = useFetch(_getAllUsers);

  return (
    <div className="pt-10">
      <DashboardPageHeader
        breadcrumbItems={[
          { href: "/dashboard", label: "Dashboard" },
          { label: "Users" },
        ]}
        title="Users"
        description="Manage all users in the application."
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

export default UsersPage;
