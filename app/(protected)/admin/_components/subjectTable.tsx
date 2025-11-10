import { useSubjectControllerFindAll } from "@/api/endpoints/subject/subject";

export default function SubjectTable() {
  const { data: services, isLoading, error } = useSubjectControllerFindAll();
}
