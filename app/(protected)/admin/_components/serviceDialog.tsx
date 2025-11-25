"use client";

import {
  getServiceControllerFindAllQueryKey,
  useServiceControllerCreate,
} from "@/api/endpoints/service/service";
import { ServiceResponseDto } from "@/api/models";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function ServiceDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createService = useServiceControllerCreate({
    mutation: {
      onMutate: async (variables) => {
        const queryKey = getServiceControllerFindAllQueryKey();

        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey });

        // Snapshot the previous value
        const previousServices =
          queryClient.getQueryData<ServiceResponseDto[]>(queryKey);

        // Optimistically update to the new value
        queryClient.setQueryData<ServiceResponseDto[]>(queryKey, (old) => {
          const optimisticService: ServiceResponseDto = {
            id: "temp-" + Date.now(),
            name: variables.data.name,
            description: variables.data.description || "",
            subjects: [],
          };
          return [...(old || []), optimisticService];
        });

        // Return context with the snapshot
        return { previousServices };
      },
      onError: (_err, _variables, context) => {
        // Rollback to the previous value on error
        if (context?.previousServices) {
          queryClient.setQueryData(
            getServiceControllerFindAllQueryKey(),
            context.previousServices
          );
        }
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries({
          queryKey: getServiceControllerFindAllQueryKey(),
        });
      },
      onSuccess: () => {
        setOpen(false);
      },
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    createService.mutate({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <DialogHeader>
            <DialogTitle>Nouveau service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Nom</Label>
              <Input id="name-1" name="name" defaultValue="Nouveau service" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                defaultValue="Une description"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" disabled={createService.isPending}>
              {createService.isPending ? "Création..." : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
