import { NavFooter } from "@/components/NavFooter";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children} <NavFooter />
    </section>
  );
}
