"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import UserTable from "./CartsTable";
import {CartsType} from "@/types";
import {motion} from "motion/react";

export default function CartsList() {
  const [carts, setCarts] = useState<CartsType[]>([]);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/carts");
        setCarts(res.data.carts);
      } catch {}
    };
    fetchCharts();
  }, []);

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <UserTable data={carts} />
    </motion.div>
  );
}
