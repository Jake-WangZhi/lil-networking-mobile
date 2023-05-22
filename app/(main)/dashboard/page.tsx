import { Header } from "@/components/Header";
import { ActionList } from "@/components/ActionList";
import { GoalSummary } from "@/components/GoalSummary";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center text-white px-4">
      <Header />
      <GoalSummary />
      <ActionList />
    </main>
  );
}
