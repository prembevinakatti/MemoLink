import useGetAllMemories from "@/hooks/useGetAllMemories";
import React from "react";
import MemoryCard from "./Memory";

const HomePage = () => {
  const memories = useGetAllMemories();
  return (
    <div  className="w-full flex flex-wrap items-start justify-start pb-14 gap-3">
      {memories && memories.length > 0 ? (
        memories.map((memory) => (
          <MemoryCard key={memory._id} memory={memory} />
        ))
      ) : (
        <p className="text-white text-center w-full mt-10">
          No memories found.
        </p>
      )}
    </div>
  );
};

export default HomePage;
