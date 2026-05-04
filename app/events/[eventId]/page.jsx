import Tag from "@/components/Tag";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

async function getEvent(id) {
  const res = await fetch(
    `https://qevent-backend.labs.crio.do/events/${id}`
  );

  if (!res.ok) {
    return null; // safer than throw during build
  }

  return res.json();
}

export default async function EventDetails({ params }) {
  const event = await getEvent(params?.eventId);

  if (!event) {
    return (
      <div className="p-10 text-center text-red-500">
        Event not found
      </div>
    );
  }

  const safeTags = Array.isArray(event?.tags) ? event.tags : [];

  const safeDate = event?.date
    ? new Date(event.date).toDateString()
    : "No date";

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="group bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] overflow-hidden">

          <div className="flex flex-col md:flex-row gap-12 items-start">

            {/* LEFT */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-orange-500">
                {event?.name || "Untitled Event"}
              </h1>

              <p className="flex items-center gap-2 text-gray-600 mt-3">
                <FaMapMarkerAlt />
                {event?.location || "Unknown location"}
              </p>

              <p className="text-gray-400 text-sm mt-1">
                {event?.artist || "Unknown artist"}
              </p>

              <div className="flex items-center gap-4 text-gray-500 mt-2 text-sm">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt />
                  {safeDate}
                </span>

                <span className="flex items-center gap-1">
                  <FaClock />
                  {event?.time || "N/A"}
                </span>
              </div>

              {/* TAGS */}
              <div className="flex gap-2 mb-4 mt-4 flex-wrap">
                {safeTags.map((tag) =>
                  typeof tag === "string" ? (
                    <Tag key={tag} text={tag} />
                  ) : null
                )}
              </div>

              <div className="border-t my-5"></div>

              <p className="text-gray-700 leading-relaxed">
                {event?.description || "No description available."}
              </p>

              <div className="flex items-center justify-between mt-8 p-5 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
                <p className="text-2xl font-bold text-green-600">
                  {event?.price > 0 ? `$${event.price}` : "FREE"}
                </p>

                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md">
                  Buy Tickets
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex-1 overflow-hidden rounded-lg">
              <img
                src={event?.image || "https://picsum.photos/800/400"}
                alt={event?.name || "event"}
                className="w-full h-96 object-cover shadow-lg"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}