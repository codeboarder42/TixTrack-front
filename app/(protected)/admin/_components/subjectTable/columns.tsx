"use client";

import { SubjectResponseDto } from "@/api/endpoints/tixTrack.schemas";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<SubjectResponseDto>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "serviceId",
    header: "Service",
  },
];
