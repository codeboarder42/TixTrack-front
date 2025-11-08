import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ServiceTable from "./_components/serviceTable";
import ServiceDialog from "./_components/serviceDialog";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-sm">
        <div className="flex justify-between items-end">
          Sujets
          <Button>
            <Plus />
          </Button>
        </div>
        <div className="h-[300px] w-[600px] bg-primary"></div>
      </div>
      <div className="flex flex-col gap-sm">
        <div className="w-full flex justify-end items-end">
          <ServiceDialog />
        </div>
        <ServiceTable />
      </div>
    </div>
  );
}
