"use client";

import Tag from "./Tag";
import Link from "next/link";

const EventCard = ({ eventData }) => {
  if (!eventData) return null;

  return (
    <div className="hover-inverse w-full h-fit group transform transition-transform duration-400 hover:scale-110 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark m-4 border-slate-400 border rounded-md p-4">
      <Link
        href={`/events/${eventData.id ?? eventData._id}`}
        className="rounded-md text-dark flex-shrink-0 scroll-snap-card p-4"
      >
        <div>
          <img
            className="w-full h-48 object-cover mb-3 shadow-lg m-auto"
            src={eventData.image || "https://picsum.photos/400/300"}
            alt={eventData.name || "event"}
          />

          <div className="flex gap-2 items-center">
            {eventData?.tags?.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>

          <p className="mt-5 mb-4">
            {eventData.date
              ? new Date(eventData.date).toDateString()
              : "No date"}{" "}
            | {eventData.time || "N/A"}
          </p>

          <p>{eventData.location || "Unknown location"}</p>
          <h2 className="text-2xl font-bold">
            {eventData.name || "Untitled Event"}
          </h2>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-2xl">
              {eventData.artist || "Unknown Artist"}
            </h3>

            <h3 className="text-2xl">
              {eventData.price > 0
                ? `$ ${eventData.price.toLocaleString()}`
                : "FREE"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
