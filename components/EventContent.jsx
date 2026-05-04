"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import Link from "next/link";

export default function EventsContent() {
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
          setError("Couldn’t load events.");
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

  if (loading) return <p className="p-6">Loading events...</p>;

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <p>{error}</p>
        <button onClick={() => setReloadKey((k) => k + 1)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {(artist || tag) && (
        <div className="p-4 flex justify-between">
          <p>
            Showing: {artist && `Artist: ${artist}`}{" "}
            {tag && `Tag: ${tag}`}
          </p>
          <Link href="/events">Clear</Link>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 p-6">
        {events.map((event) => (
          <EventCard key={event.id ?? event._id} eventData={event} />
        ))}
      </div>
    </>
  );
}