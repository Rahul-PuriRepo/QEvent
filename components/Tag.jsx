"use client";

import { useRouter } from "next/navigation";

const Tag = ({ text }) => {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/events?tag=${encodeURIComponent(text)}`)
      }
      className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl px-3 py-1 text-sm font-bold cursor-pointer hover:scale-110 transition"
    >
      #{text}
    </div>
  );
};

export default Tag;