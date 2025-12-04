"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import UserTable from "./CartsTable";
import {TodosType} from "@/types";
import {motion} from "motion/react";

export default function TodosList() {
  const [todos, setTodos] = useState<TodosType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/todos");
        setTodos(res.data.todos);
      } catch {}
    };
    fetchTodos();
  }, []);

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3, delay: 0.9}}
    >
      <UserTable data={todos} />
    </motion.div>
  );
}
