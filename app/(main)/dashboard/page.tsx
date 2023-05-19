import { DashboardHeader } from "@/components/DashboardHeader";
import { ActionList } from "@/components/ActionList";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <DashboardHeader />
      <div className="w-full">
        <ActionList />
      </div>
    </main>
  );
}
