import useGetAllUsers from "@/hooks/useGetAllUsers";
import React, { useState } from "react";
import UserCard from "./UserCard";
import { Input } from "@/components/ui/input";

const SearchUser = () => {
  const allUsers = useGetAllUsers();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on the search term, but show all users if search is empty
  const filteredUsers =
    searchTerm.trim() === ""
      ? allUsers
      : allUsers?.filter((user) =>
          user?.username?.toLowerCase().includes(searchTerm?.toLowerCase())
        );

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-8 w-full flex items-center justify-center">
        <Input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-blue-400 rounded-full py-5 w-[70vw]"
        />
      </div>

      {/* User List */}
      <div className="flex flex-wrap gap-4">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
