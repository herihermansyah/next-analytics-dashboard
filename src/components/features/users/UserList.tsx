"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import {UsersType} from "@/types/user.types";
import UserTable from "./UserTable";
import {motion} from "motion/react";

function UserList() {
  const [users, setUsers] = useState<UsersType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/users");
        setUsers(res.data.users);
      } catch (error) {
        console.log("Fetch users error: ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <UserTable data={users} />
    </motion.div>
  );
}

export default UserList;
