import axios from "axios";
import { useState } from "react";

const useGetFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/MemoLink/auth/getFollowers`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setFollowers(response.data.followers || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { followers, loading, error, fetchFollowers };
};

export default useGetFollowers;
