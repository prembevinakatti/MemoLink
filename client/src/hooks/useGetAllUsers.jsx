import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fectAllUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/MemoLink/auth/getAllUsers`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.log("Error Getitng All Users in Hook : ", error.message);
      }
    };
    fectAllUsers();
  }, []);

  return users;
};

export default useGetAllUsers;
