"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import EventCard from "@/components/EventCard";
import Link from "next/link";

function EventsContent() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [allEvents, setAllEvents] = useState([]);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setError(null);
        setLoading(true);
        setAllEvents([]);
        setEvents([]);

        const res = await fetch("https://qevent-backend.labs.crio.do/events", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const data = Array.isArray(json) ? json : [];

        setAllEvents(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("Couldn’t load events. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    let filtered = allEvents;

    if (artist) {
      filtered = filtered.filter(
        (e) => e.artist?.toLowerCase() === artist.toLowerCase()
      );
    }

    if (tag) {
      filtered = filtered.filter((e) =>
        e.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      );
    }

    setEvents(filtered);
  }, [artist, tag, allEvents]);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading events...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-2 underline text-blue-500"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {(artist || tag) && (
        <div className="px-6 pt-4 flex items-center justify-between gap-4">
          <p className="text-gray-600">
            Showing events for{" "}
            <b>
              {artist ? `artist: ${artist}` : ""}
              {artist && tag ? " & " : ""}
              {tag ? `tag: ${tag}` : ""}
            </b>
          </p>
          <Link href="/events" className="text-blue-500 underline">
            Clear filters
          </Link>
        </div>
      )}

      {events.length === 0 ? (
        <p className="p-6 text-gray-500">No events found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {events.map((event) => (
            <EventCard key={event.id ?? event._id} eventData={event} />
          ))}
        </div>
      )}
    </>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<p className="p-6">Loading...</p>}>
      <EventsContent />
    </Suspense>
  );
}