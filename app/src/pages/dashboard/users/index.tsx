import { UsersTable } from "@/components/dashboard/table/users-table/data-table";
// import { useFetch } from "@/hooks/useFetch";
import { UserTableColumns } from "@/components/dashboard/table/users-table/columns";
import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ErrorComponent";
import DashboardPageHeader from "@/components/dashboard/page-header";
// import { _getAllUsers } from "./actions";
import { IApiResponse, IUser } from "@/types";
import { useLoaderData, useNavigation } from "react-router-dom";
import { AxiosResponse } from "axios";

const UsersPage: React.FC = () => {
  // const { data, isLoading, isError } = useFetch(_getAllUsers);
  const response = useLoaderData() as AxiosResponse<IApiResponse<IUser[]>>;
  const { data: users, success } = response.data;

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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

      {/* {isError && (
        <ErrorComponent
          title="Something went wrong!"
          message="Something went wrong when trying to fetch data. Please try again later and contact us."
        />
      )} */}
      {!isLoading && !success && (
        <ErrorComponent
          title="Something went wrong!"
          message="Something went wrong when trying to fetch data. Please try again later and contact us."
        />
      )}
      {isLoading && <Loader />}
      {!isLoading && success && (
        <UsersTable columns={UserTableColumns} data={users} />
      )}
    </div>
  );
};

export default UsersPage;
