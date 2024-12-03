import { useState, useEffect } from "react";
import axios from "axios";

const useGetTaggedUsers = (tags) => {
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tags && tags.length > 0) {
      const fetchTaggedUsers = async () => {
        setLoading(true);
        setError(null); 
        try {
          const response = await axios.post(
            `http://localhost:3000/api/MemoLink/memory/getUserByTag`,
            { tags },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (response.data.success) {
            setTaggedUsers(response.data.users);
          } else {
            setError("No users found with these tags");
          }
        } catch (error) {
          setError("Error fetching tagged users");
          console.error("Error fetching tagged users:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTaggedUsers();
    }
  }, [tags]);

  return { taggedUsers, loading, error };
};

export default useGetTaggedUsers;
