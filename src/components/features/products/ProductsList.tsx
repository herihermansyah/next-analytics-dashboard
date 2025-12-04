"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import UserTable from "./ProductsTable";
import {ProductsType} from "@/types";
import {motion} from "motion/react";

export default function ProductsList() {
  const [products, setProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setProducts(res.data.products);
      } catch {}
    };
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <UserTable data={products} />
    </motion.div>
  );
}
