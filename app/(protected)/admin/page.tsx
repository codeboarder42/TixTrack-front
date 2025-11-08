import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <div className="flex justify-between items-end">
          Srevices
          <Button>
            <Plus />
          </Button>
        </div>
        <div className="h-[300px] w-[600px] bg-primary"></div>
      </div>
    </div>
  );
}
