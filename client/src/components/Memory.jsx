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
import useGetFollowers from "@/hooks/useGetFollowers";

const MemoryCard = ({ memory }) => {
  const { _id, user, location, content, tags, likes } = memory;

  // State for likes
  const [liked, setLiked] = useState(likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(likes.length);

  // State for follow status
  const [isFollowing, setIsFollowing] = useState(false);

  // State for saved memory
  const [saved, setSaved] = useState(false);

  // State for fetching and showing followers
  const [fetchingFollowers, setFetchingFollowers] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [followersError, setFollowersError] = useState(null);

  const { taggedUsers, loading, error } = useGetTaggedUsers(tags);

  // Fetch follow state on component mount
  useEffect(() => {
    const fetchFollowState = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/MemoLink/auth/isFollowing/${user._id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setIsFollowing(response.data.isFollowing);
        } else {
          console.error("Failed to fetch follow state:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching follow state:", error);
      }
    };

    fetchFollowState(); // Fetch on component mount
  }, [user._id]);

  // Fetch saved state for memory
  useEffect(() => {
    const fetchSavedState = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/MemoLink/memory/isSaved/${_id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setSaved(response.data.isSaved);
        }
      } catch (error) {
        console.error("Error fetching saved state:", error);
      }
    };

    fetchSavedState();
  }, [_id]);

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

  // Toggle follow state
  const handleFollowToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/MemoLink/auth/toggleFollow/${user._id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setIsFollowing(!isFollowing); // Toggle follow state
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  // Toggle save state
  const handleSaveToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/MemoLink/memory/savePost/${_id}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSaved(!saved); // Toggle save state
      }
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  // Fetch followers when the dropdown is triggered
  const handleFetchFollowers = async () => {
    setFetchingFollowers(true);
    setFollowersError(null);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/MemoLink/auth/getFollowers/${user._id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setFollowers(response.data.followers || []);
      } else {
        setFollowersError("Failed to fetch followers");
      }
    } catch (error) {
      setFollowersError("Error fetching followers");
      console.error("Error fetching followers:", error.message);
    } finally {
      setFetchingFollowers(false);
    }
  };

  return (
    <div className="bg-black w-[32vw] text-white rounded-lg shadow-lg border border-gray-800 p-6 max-w-xl">
      {/* User Info */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
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
        <button
          onClick={handleFollowToggle}
          className={`px-4 py-1 text-sm font-medium rounded-md ${
            isFollowing
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
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

        {/* Share Button to Show Followers Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            onClick={handleFetchFollowers}
            className="flex items-center text-gray-400 hover:text-green-400 transition"
          >
            <BsFillSendFill />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white border border-gray-700 w-[240px] rounded-md p-2">
            <h3 className="text-sm text-gray-400 font-semibold mb-2">
              Followers
            </h3>
            {fetchingFollowers ? (
              <p className="text-xs text-gray-500 text-center">Loading...</p>
            ) : followersError ? (
              <p className="text-xs text-gray-500 text-center">
                {followersError}
              </p>
            ) : followers.length > 0 ? (
              followers.map((follower) => (
                <DropdownMenuItem key={follower._id}>
                  {follower.username}
                </DropdownMenuItem>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center">No followers</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Save Button */}
        <button
          onClick={handleSaveToggle}
          className={`flex items-center ${
            saved ? "text-yellow-400" : "text-gray-400"
          } hover:text-yellow-400 transition`}
        >
          <FaBookmark className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default MemoryCard;
