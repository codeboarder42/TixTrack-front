import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceTable from "./_components/serviceTable";
import ServiceDialog from "./_components/serviceDialog";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSubjectControllerFindAllQueryOptions } from "@/api/endpoints/subject/subject";
import { SubjectsTable } from "./_components/subjectTable/data-table";
import SubjectDialog from "./_components/subjectDialog";
import { getServiceControllerFindAllQueryOptions } from "@/api/endpoints/service/service";

export default async function AdminPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getSubjectControllerFindAllQueryOptions());
  await queryClient.prefetchQuery(getServiceControllerFindAllQueryOptions());

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-end">
          <h2>Services</h2>
          <ServiceDialog />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ServiceTable />
        </HydrationBoundary>
      </div>
      <div className="flex flex-col gap-sm">
        <div className="w-full flex justify-between items-end">
          <h2>Sujets</h2>
          <SubjectDialog />
        </div>
        <SubjectsTable />
      </div>
    </div>
  );
}
