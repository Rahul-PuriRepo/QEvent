import Tag from "@/components/Tag";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

async function getEvent(id) {
  const res = await fetch(
    `https://qevent-backend.labs.crio.do/events/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch event");
  }

  return res.json();
}

export default async function EventDetails({ params }) {
  const event = await getEvent(params.eventId);

  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      <div className="group bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] will-change-transform overflow-hidden">

      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-12 items-start">
        
        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-orange-500">
  {event.name}
</h1>

{/* LOCATION */}
<p className="flex items-center gap-2 text-gray-600 mt-3">
  <FaMapMarkerAlt className="text-orange-400" />
  {event.location}
</p>

{/* ARTIST */}
<p className="text-gray-400 text-sm mt-1">
  {event.artist}
</p>

{/* DATE + TIME */}
<div className="flex items-center gap-4 text-gray-500 mt-2 text-sm">
  <span className="flex items-center gap-1">
    <FaCalendarAlt />
    {new Date(event.date).toDateString()}
  </span>

  <span className="flex items-center gap-1">
    <FaClock />
    {event.time}
  </span>
</div>

          {/* TAGS */}
          <div className="flex gap-2 mb-4 mt-4 flex-wrap">
            {event.tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>

            <div className="border-t my-5"></div>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed">
            {event.description || "No description available."}
          </p>

          {/* PRICE + BUTTON */}
          <div className="flex items-center justify-between mt-8 p-5 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
  <p className="text-2xl font-bold text-green-600">
    {event.price > 0 ? `$${event.price}` : "FREE"}
  </p>

  <button className="bg-red-500 hover:bg-red-600 active:scale-95 transition-all text-white px-6 py-2 rounded-md font-semibold shadow-md">
    Buy Tickets
  </button>
</div>
    </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 overflow-hidden rounded-lg">
          <img
            src={event.image || "https://picsum.photos/800/400"}
            alt={event.name}
            className="w-full h-96 object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}