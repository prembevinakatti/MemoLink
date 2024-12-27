import React from "react";
import { FaThumbsUp, FaMapMarkerAlt, FaTag } from "react-icons/fa"; // Importing React Icons

const MemoryCard = ({ username, content, likes, tags, location }) => {
  return (
    <div className="bg-[#161b22] p-4 rounded-lg shadow-md border border-blue-500 w-72">
      <h4 className="text-lg font-bold text-white mb-2">{username}</h4>
      <p className="text-white mb-4">{content}</p>

      <div className="text-sm text-white space-y-2">
        {/* Location */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-400" />
          <p>{location || "Unknown"}</p>
        </div>

        {/* Likes */}
        <div className="flex items-center gap-2">
          <FaThumbsUp className="text-blue-400" />
          <p>{likes || 0}</p>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <FaTag className="text-blue-400" />
          <p>{tags && tags.length > 0 ? tags.join(", ") : "No Tags"}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
