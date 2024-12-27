import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetMemoryByUser = () => {
  const [memories, setMemories] = useState([]);
  useEffect(() => {
    const fetchUserMemory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/MemoLink/memory/getMemoriesByUser`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setMemories(res.data.memories);
      } catch (error) {
        console.log("Error fetching user memory in client", error.message);
      }
    };
    fetchUserMemory();
  }, []);

  return memories;
};

export default useGetMemoryByUser;
