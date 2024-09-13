import { useFetch } from "@/hooks/useFetch";

import Loader from "@/components/ui/loader";
import ErrorComponent from "@/components/ErrorComponent";
import DashboardPageHeader from "@/components/dashboard/page-header";
import { GeometriesTable } from "@/components/dashboard/table/geometries-table/data-table";
import { GeometriesTableColumns } from "@/components/dashboard/table/geometries-table/columns";
import { _getAllUsersGeometries } from "./actions";

const GeometriesPage: React.FC = () => {
  const { data, isLoading, isError } = useFetch(_getAllUsersGeometries);


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
        <GeometriesTable columns={GeometriesTableColumns} data={data} />
      )}
    </div>
  );
};

export default GeometriesPage;
