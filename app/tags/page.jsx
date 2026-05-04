import Tag from "@/components/Tag";

async function getEvents() {
  const res = await fetch("https://qevent-backend.labs.crio.do/events");

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export default async function TagsPage() {
  const events = await getEvents();

  // Extract unique tags
  const allTags = events.flatMap((e) => e.tags);
  const uniqueTags = [...new Set(allTags)];

  return (
    <div className="flex flex-wrap gap-4 p-6">
      {uniqueTags.map((tag) => (
        <Tag key={tag} text={tag} />
      ))}
    </div>
  );
}