import ArtistCard from "@/components/ArtistCard";

async function getArtists() {
  const res = await fetch("https://qevent-backend.labs.crio.do/artists");

  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }

  const json = await res.json();
  return Array.isArray(json) ? json : [];
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {artists.map((artist) =>
        artist ? (
          <ArtistCard
            key={artist.id ?? artist._id}
            artistData={artist}
          />
        ) : null
      )}
    </div>
  );
}