"use client";

import * as React from "react";
import {Label, Pie, PieChart} from "recharts";

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
import {UsersType} from "@/types";
import axios from "axios";
import {motion} from "motion/react";

export const description = "A donut chart with text";

const chartConfig = {
  totalUser: {
    label: "Total User",
  },
  men: {
    label: "Men : ",
  },
  women: {
    label: "Women : ",
  },
} satisfies ChartConfig;

export function PieChartUserGender() {
  const [users, setUsers] = React.useState<UsersType[]>([]);

  React.useEffect(() => {
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

  const chartData = React.useMemo(() => {
    const summary = users.reduce(
      (acc, user) => {
        acc.totalUser += 1;
        if (user.gender === "male") acc.men += 1;
        if (user.gender === "female") acc.women += 1;
        return acc;
      },
      {totalUser: 0, men: 0, women: 0}
    );
    return {
      summary,
      chart: [
        {name: "men", value: summary.men, fill: "var(--chart-1)"},
        {name: "women", value: summary.women, fill: "var(--chart-3)"},
      ],
    };
  }, [users]);

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3, delay: 0.6}}
    >
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle className="capitalize">user - gender charts</CardTitle>
          <CardDescription className="capitalize">
            data dummyjson
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData.chart}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({viewBox}) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {chartData.summary.totalUser}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
