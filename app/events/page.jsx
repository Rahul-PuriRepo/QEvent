import { Suspense } from "react";
import EventsContent from "@/components/EventsContent";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <EventsContent />
    </Suspense>
  );
}