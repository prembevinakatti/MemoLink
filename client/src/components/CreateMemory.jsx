import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllUsers from "@/hooks/useGetAllUsers";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateMemory = () => {
  const [memory, setMemory] = useState({
    location: "",
    content: "",
    tags: [], // Tags will store user IDs
  });
  const [selectedTag, setSelectedTag] = useState(""); // For selected user tag
  const [selectedTagId, setSelectedTagId] = useState(""); // To store user ID
  const users = useGetAllUsers(); // Assuming this hook returns users with _id and username
  const { authUser } = useSelector((store) => store.user);
  console.log("Auth user", authUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value });
  };

  const handleAddTag = () => {
    if (selectedTag && !memory.tags.includes(selectedTagId)) {
      // Add user ID to tags
      setMemory({
        ...memory,
        tags: [...memory.tags, selectedTagId],
      });
    }
    setSelectedTag(""); // Reset the selected username after adding
    setSelectedTagId(""); // Reset the selected user ID after adding
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(memory);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/MemoLink/memory/createMemory`,
        memory,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error Creating Memory in client : ", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-black border border-zinc-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Create a Memory</h2>
      <form onSubmit={handleSubmit}>
        {/* Location Field with ShadCN Input */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-300 font-medium">
            Location
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            value={memory.location}
            onChange={handleChange}
            className="w-full mt-2  text-white focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Content Field with ShadCN Textarea */}
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-300 font-medium">
            Content
          </label>
          <Textarea
            id="content"
            name="content"
            value={memory.content}
            onChange={handleChange}
            className="w-full mt-2  text-white focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Describe your memory"
            rows="4"
            required
          />
        </div>

        {/* Tags Field with ShadCN Dropdown */}
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-300 font-medium">
            Tags (Users)
          </label>
          <div className="flex items-center">
            <Select
              value={selectedTag}
              onValueChange={(value) => {
                const user = users.find((user) => user.username === value);
                setSelectedTag(value); // Store the username
                setSelectedTagId(user ? user._id : ""); // Store the user ID
              }}
              className="w-full mt-2 bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-500"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user._id} value={user.username}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddTag}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add
            </Button>
          </div>
          <div className="mt-2">
            {memory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tagId, index) => {
                  const user = users.find((user) => user._id === tagId);
                  return (
                    <span
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {user?.username}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Share Memory
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMemory;
