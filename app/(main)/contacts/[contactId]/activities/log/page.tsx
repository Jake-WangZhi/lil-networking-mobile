import { ActivityForm } from "@/components/ActivityForm";
import "../../../styles.css";

export default function LogPage({ params }: { params: { contactId: string } }) {
  return <ActivityForm contactId={params.contactId} />;
}
