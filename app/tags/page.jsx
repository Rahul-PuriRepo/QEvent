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

  // Safe extraction of tags
  const allTags = events.flatMap((e) =>
    Array.isArray(e?.tags) ? e.tags : []
  );

  const uniqueTags = [...new Set(allTags.filter(Boolean))];

  return (
    <div className="flex flex-wrap gap-4 p-6">
      {uniqueTags.map((tag) =>
        typeof tag === "string" ? (
          <Tag key={tag} text={tag} />
        ) : null
      )}
    </div>
  );
}