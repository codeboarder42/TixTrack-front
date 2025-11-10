"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useSubjectControllerFindAll } from "@/api/endpoints/subject/subject";

export function SubjectsTable() {
  const { data: subjects, isLoading } = useSubjectControllerFindAll();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <DataTable columns={columns} data={subjects ?? []} />;
}
