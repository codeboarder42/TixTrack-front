"use client";

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
import * as z from "zod";
import { revalidateLogic, useForm } from "@tanstack/react-form";

import { toast } from "sonner";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getServiceControllerFindAllQueryOptions } from "@/api/endpoints/service/service";
import { useState } from "react";
import {
  getSubjectControllerFindAllQueryKey,
  useSubjectControllerCreate,
} from "@/api/endpoints/subject/subject";
import { SubjectResponseDto } from "@/api/endpoints/tixTrack.schemas";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(255, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 20 characters.")
    .max(255, "Description must be at most 100 characters."),
  serviceId: z
    .string()
    .min(1, "Il faut selectionner un service")
    .refine((val) => val !== "default", {
      message: "Par défaut n'est pas autorisé",
    }),
});

export default function SubjectDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: services = [] } = useQuery(
    getServiceControllerFindAllQueryOptions()
  );

  const createSubject = useSubjectControllerCreate({
    mutation: {
      onMutate: async (variables) => {
        const queryKey = getSubjectControllerFindAllQueryKey();

        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey });

        // Snapshot the previous value
        const previousServices =
          queryClient.getQueryData<SubjectResponseDto[]>(queryKey);

        // Optimistically update to the new value
        queryClient.setQueryData<SubjectResponseDto[]>(queryKey, (old) => {
          const optimisticService: SubjectResponseDto = {
            id: "temp-" + Date.now(),
            name: variables.data.name,
            description: variables.data.description || "",
            serviceId: variables.data.serviceId,
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
            getSubjectControllerFindAllQueryKey(),
            context.previousServices
          );
        }
      },
      onSettled: () => {
        // Always refetch after error or success
        queryClient.invalidateQueries({
          queryKey: getSubjectControllerFindAllQueryKey(),
        });
      },
      onSuccess: () => {
        setOpen(false);
        toast.success("Sujet créé avec succès");
      },
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      serviceId: "",
    },
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: formSchema,
    },
    onSubmit: async ({ value }) => {
      createSubject.mutate({ data: value });
      form.reset();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          form.reset(); // Reset form when dialog closes
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          id="subject-dialog"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-col gap-md"
        >
          <DialogHeader>
            <DialogTitle>Nouveau sujet</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Ticket restaurant"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Pour toute demande relative aux tickets restaurant"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="serviceId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Service</FieldLabel>
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="form-tanstack-service"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="default">Par défault</SelectItem>
                        <SelectSeparator />
                        {services.map((service) => (
                          <SelectItem key={service.name} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button type="submit" form="subject-dialog">
              Créer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
