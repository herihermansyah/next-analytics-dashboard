"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
import {CartsType} from "@/types";
import axios from "axios";
import {motion} from "motion/react";

const chartConfig = {
  totalValue: {
    label: "total value : ",
    color: "var(--chart-3)",
  },
  totalQuantity: {
    label: "total quantity : ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartLineValue() {
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

  const chartData = Object.values(
    carts.reduce((acc, item) => {
      const userID = item.userId;
      if (!acc[userID]) {
        acc[userID] = {
          userID,
          totalValue: 0,
          totalQuantity: 0,
        };
      }
      acc[userID].totalValue += item.discountedTotal;
      acc[userID].totalQuantity += item.totalQuantity;

      return acc;
    }, {} as Record<string, {totalValue: number; userID: number; totalQuantity: number}>)
  );

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            cart - total value & total quantity
          </CardTitle>
          <CardDescription className="capitalize">
            data dummyjson
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="userID"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                yAxisId="left"
                dataKey="totalValue"
                type="natural"
                stroke="var(--color-totalValue)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-totalValue)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  formatter={(value: number) =>
                    new Intl.NumberFormat("us", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(value)
                  }
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
              <Line
                dataKey="totalQuantity"
                yAxisId="right"
                type="natural"
                stroke="var(--color-totalQuantity)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-totalQuantity)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
