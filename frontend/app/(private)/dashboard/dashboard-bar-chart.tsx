"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Income } from "../types";
import { useMemo } from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 p-4 rounded shadow border border-purple-200">
        <p className="font-mono text-sm text-green-500">{`R$${payload[0].value.toLocaleString(
          "pt-BR"
        )}`}</p>
        <p className="text-xs text-gray-200">{`${payload[0].payload.count} renda(s)`}</p>
      </div>
    );
  }
  return null;
};

interface MonthlyData {
  name: string;
  year: number;
  timestamp: number;
  value: number;
  count: number;
  month: string; // For display on the x-axis
}

type MonthlyMap = {
  [monthYear: string]: MonthlyData;
};

interface CustomBarChartProps {
  incomes: Income[];
  monthLimit?: number;
}

export default function CustomBarChart({
  incomes,
  monthLimit = 6,
}: CustomBarChartProps) {
  // Process data to aggregate by month
  const aggregatedData = useMemo(() => {
    // Create a map to store monthly totals and entry counts
    const monthlyMap: MonthlyMap = {};

    // Process each income entry
    incomes.forEach((entry) => {
      const date = new Date(entry.data);
      const monthYear = date.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = {
          name: date.toLocaleString("pt-BR", { month: "long" }),
          month: date.toLocaleString("pt-BT", { month: "short" }),
          year: date.getFullYear(),
          timestamp: date.getTime(), // For sorting
          value: 0,
          count: 0,
        };
      }

      monthlyMap[monthYear].value += entry.valor;
      monthlyMap[monthYear].count += 1;
    });

    // Convert map to array and sort by date (newest first)
    let result = Object.values(monthlyMap);
    result.sort((a, b) => b.timestamp - a.timestamp);

    // Limit to the specified number of months
    return result.slice(0, monthLimit);
  }, [incomes, monthLimit]);

  // Format value for Y-axis
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `R$${value / 1000}k`;
    }
    return `R$${value}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Renda Mensal</CardTitle>
        <CardDescription className="text-center"></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={aggregatedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value, index) => {
                // Show month and year (e.g., "Jan '24")
                const item = aggregatedData[index];
                return `${item.month} ${String(item.year).slice(-2)}`;
              }}
            />
            <YAxis tickFormatter={formatYAxis} />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="value" fill="var(--chart-2)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
