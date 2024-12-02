import React, { useState, useEffect } from "react";
import { FaHeart, FaRegCommentDots, FaBookmark } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // ShadCN dropdown components
import useGetTaggedUsers from "@/hooks/useGetTaggedUsers";

const MemoryCard = ({ memory }) => {
  const { _id, user, location, content, tags, likes } = memory;

  // State for likes
  const [liked, setLiked] = useState(likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(likes.length);

  const { taggedUsers, loading, error } = useGetTaggedUsers(tags);

  // Toggle like state
  const handleLikeToggle = async (memoryId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/MemoLink/memory/likeMemory/${memoryId}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="bg-black w-[32vw] text-white rounded-lg shadow-lg border border-gray-800 p-6 max-w-xl">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.profilePhoto}
          alt={`${user.username}'s profile`}
          className="w-10 h-10 rounded-full border border-gray-600"
        />
        <div>
          <h3 className="font-semibold capitalize">{user.username}</h3>
          <p className="text-sm flex capitalize items-center justify-center gap-1 text-gray-400">
            <IoLocationSharp />
            {location}
          </p>
        </div>
      </div>

      {/* Memory Content */}
      <p className="text-gray-300 mb-4">{content}</p>

      {/* Action Buttons */}
      <div className="flex items-center justify-around border-t border-gray-700 pt-4 mt-4">
        {/* Like Button */}
        <button
          onClick={() => handleLikeToggle(_id)}
          className={`flex items-center ${
            liked ? "text-pink-500" : "text-gray-400"
          } hover:text-pink-500 transition`}
        >
          <FaHeart className="mr-2" /> {likeCount}
        </button>

        {/* Tags Dropdown Button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-gray-400 hover:text-blue-400 transition">
            <FaRegCommentDots className="mr-2" /> {tags?.length}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border border-gray-700 w-[240px] rounded-md p-2">
            <h3 className="text-sm text-gray-400 font-semibold mb-2">
              Tagged Users
            </h3>

            {loading ? (
              <p className="text-xs text-gray-500 text-center">Loading...</p>
            ) : error ? (
              <p className="text-xs text-gray-500 text-center">{error}</p>
            ) : taggedUsers.length > 0 ? (
              taggedUsers.map((taggedUser, index) => (
                <DropdownMenuItem
                  key={index}
                  className="flex items-center gap-3 px-2 py-2 hover:bg-gray-800 rounded-md"
                >
                  <img
                    src={taggedUser.profilePhoto}
                    alt={`${taggedUser.username}'s profile`}
                    className="w-8 h-8 rounded-full border border-gray-600"
                  />
                  <div>
                    <p className="font-medium text-sm">{taggedUser.username}</p>
                    <p className="text-xs text-gray-400">
                      {taggedUser.email || "No email available"}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center">
                No tagged users.
              </p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Share Button */}
        <button
          onClick={() => alert("Share functionality coming soon!")}
          className="flex items-center text-gray-400 hover:text-green-400 transition"
        >
          <BsFillSendFill />
        </button>

        {/* Save Button */}
        <button
          onClick={() => alert("Saved!")}
          className="flex items-center text-gray-400 hover:text-yellow-400 transition"
        >
          <FaBookmark className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;
