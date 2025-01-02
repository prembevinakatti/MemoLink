import useGetMemoryByUser from "@/hooks/useGetMemoryByUser";
import React from "react";
import { useSelector } from "react-redux";
import MemoryCard from "./MemoryCard";

const Dashboard = () => {
  const memories = useGetMemoryByUser(); // Fetch user-created memories
  console.log(memories);
  
  const { authUser } = useSelector((store) => store.user);

  return (
    <div className="bg-black text-blue-200 p-6">
      {/* Top Section */}
      <div className="border border-blue-400 rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          {/* Profile Info */}
          <div className="flex items-center gap-4">
            <img
              src={authUser?.profilePhoto} // Replace with actual profile image URL
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-bold capitalize text-blue-400">
                {authUser?.username}
              </h2>
              <p className="text-blue-300">{authUser?.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {authUser?.followers.length}
              </p>
              <p className="text-blue-300">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {authUser?.following.length}
              </p>
              <p className="text-blue-300">Following</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {memories.length}
              </p>
              <p className="text-blue-300">Memories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {authUser?.savedMemory.length}
              </p>
              <p className="text-blue-300">Saved Memories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - User-Created Memories */}
      <div className="bg-[#0d1117] rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Memories</h3>
        <div className="w-full flex flex-wrap items-center gap-10">
          {memories && memories.length > 0 ? (
            memories.map((memory) => (
              <MemoryCard
                key={memory._id}
                username={memory.user.username || "Unknown User"}
                content={memory.content}
                likes={memory.likes.length}
                tags={memory.tags.length}
                location={memory.location}
              />
            ))
          ) : (
            <p className="text-blue-300">No memories created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
