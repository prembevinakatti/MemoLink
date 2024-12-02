import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllMemories = () => {
  const [memories, setMemories] = useState([]);
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/MemoLink/memory/getAllMemories`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setMemories(response.data.memories);
        }
      } catch (error) {
        console.log("Error fetching all memory in hook", error);
      }
    };
    fetchMemories();
  }, []);

  return memories;
};

export default useGetAllMemories;
