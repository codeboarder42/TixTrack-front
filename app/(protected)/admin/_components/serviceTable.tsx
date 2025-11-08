"use client";

import {
  getServiceControllerFindAllQueryKey,
  useServiceControllerDelete,
  useServiceControllerFindAll,
} from "@/api/endpoints/service/service";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";

export default function ServiceTable() {
  const queryClient = useQueryClient();
  const { data: services, isLoading, error } = useServiceControllerFindAll();
  const deleteMutation = useServiceControllerDelete();

  const handleEdit = (data: string) => {
    console.log(data);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id });
      // Invalidate the query to refetch the list
      queryClient.invalidateQueries({
        queryKey: getServiceControllerFindAllQueryKey(),
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  if (isLoading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>ERROR SERVICE</div>;
  }

  if (!services || services.length === 0) return <p>Aucun service</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nom</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.name}>
            <TableCell className="font-medium">{service.name}</TableCell>
            <TableCell>{service.description}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(service.id)}
                >
                  <Pencil />
                </Button>
                <Button
                  className="hover:text-destructive"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(service.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
