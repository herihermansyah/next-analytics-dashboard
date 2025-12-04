"use client";

import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {useEffect, useState} from "react";
import {ProductsType} from "@/types";
import axios from "axios";
import {motion} from "motion/react";

const chartConfig = {
  price: {
    label: "price",
    color: "var(--chart-2)",
  },
  stock: {
    label: "stock",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarCategory() {
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

  const chartData = Object.values(
    products.reduce((acc, item) => {
      const category = item.category;

      if (!acc[category]) {
        acc[category] = {
          category,
          totalValue: 0,
          totalStock: 0,
        };
      }

      acc[category].totalValue += item.price * item.stock;
      acc[category].totalStock += item.stock;

      return acc;
    }, {} as Record<string, {totalValue: number; totalStock: number; category: string}>)
  );

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3, delay: 0.3}}
    >
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            category - total stock & total value
          </CardTitle>
          <CardDescription className="capitalize">
            data dummyjson
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer className="h-full w-full" config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                className="cursor-pointer"
                dataKey="totalStock"
                yAxisId="left"
                fill="var(--color-price)"
              />
              <Bar
                className="cursor-pointer"
                dataKey="totalValue"
                yAxisId="right"
                fill="var(--color-stock)"
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
