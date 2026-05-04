import { Suspense } from "react";
import EventsContent from "./EventsContent";

export default function EventsPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <EventsContent />
    </Suspense>
  );
}